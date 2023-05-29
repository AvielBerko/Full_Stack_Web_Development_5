import Indexable from "../interfaces/Indexable";

type GettersType = {
  getList: <T extends Indexable>(path: string) => Promise<T[]>;
  getOne: <T extends Indexable>(fullPath: string) => Promise<T | null>;
  find: (path: string, query: any) => Promise<any[]>;
  page: (path: string, page: number, limit: number) => Promise<any[]>;
  priority: number;
};

let functions: GettersType[] = [];

export function registerGetters(getters: GettersType) {
  functions.push(getters);
  //sort the funcitons so the function with the low priority is first
  functions.sort((a, b) => a.priority - b.priority);
}

export async function getList<T extends Indexable>(path: string): Promise<T[]> {
  let results: { [id: string]: T } = {};
  for (const func of functions) {
    const res = await func.getList<T>(path);
    if (!res || res.length === 0) {
      continue;
    }
    results = res.reduce((acc, cur, index) => {
      acc[cur.id ?? index.toString()] = cur;
      return acc;
    }, results);
  }
  return Object.keys(results).map((key) => results[key]);
}

export async function getOne<T extends Indexable>(
  fullPath: string
): Promise<T | null> {
  const reversedFunctions = [...functions].reverse();
  for (const func of reversedFunctions) {
    const res = await func.getOne<T>(fullPath);
    if (res == undefined) {
      continue;
    }
    return res;
  }
  return null;
}

export async function find<T extends Indexable>(
  path: string,
  query: any
): Promise<T[]> {
  let results: { [id: string]: T } = {};
  for (const func of functions) {
    const res = await func.find(path, query);
    if (!res || res.length === 0) {
      continue;
    }
    results = res.reduce((acc, cur, index) => {
      acc[cur.id ?? index.toString()] = cur;
      return acc;
    }, results);
    return res;
  }
  return Object.keys(results).map((key) => results[key]);
}

export async function page(
  path: string,
  page: number,
  limit: number
): Promise<any[]> {
  let results: { [id: string]: Indexable } = {};
  for (const func of functions) {
    const res = await func.page(path, page, limit);
    if (!res || res.length === 0) {
      continue;
    }
    results = res.reduce((acc, cur, index) => {
      acc[cur.id ?? index.toString()] = cur;
      return acc;
    }, results);
    return res;
  }
  return Object.keys(results).map((key) => results[key]);
}
