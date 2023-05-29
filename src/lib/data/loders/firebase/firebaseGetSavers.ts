import Indexable from "../interfaces/Indexable";
import { registerSavers } from "../mainLoader/saveLoder";
import {
  ref,
  set,
  push as pushFirebase,
  remove as removeFirebase,
} from "firebase/database";
import { db } from "../../../firebase/setup";

async function save<T extends Indexable>(path: string, item: T): Promise<void> {
  await set(ref(db, path), item);
}

async function push<T extends Indexable>(
  path: string,
  item: T
): Promise<string> {
  const listRef = ref(db, path);
  const newKey = pushFirebase(listRef).key;
  if (!newKey) throw new Error("Failed to push to firebase");
  item.id = newKey;
  const pushedRef = await pushFirebase(listRef, item);
  if (!pushedRef.key) throw new Error("Failed to push to firebase");
  return pushedRef.key;
}

async function remove(path: string): Promise<void> {
    const refToRemove = ref(db, path);
    await removeFirebase(refToRemove);
}

export default function initFirebaseSaveLoader() {
  registerSavers({
    save,
    push,
    remove,
    priority: 0,
  });
}
