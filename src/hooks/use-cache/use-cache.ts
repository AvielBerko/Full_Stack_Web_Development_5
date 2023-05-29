import { useEffect, useState } from "react";
import { Serializiation } from "../../types/dataObjects.types";

/**
 *
 * @param cachePath the path to the cache
 * @param cachedFunction the promise to cahce
 * @returns the cached data and a function to clear the cache
 */
export function useCache<T>(
  cachePath: string,
  cachedFunction: Promise<T>,
  serialization?: Serializiation<T>
): [T | undefined, () => void] {
  const [data, setData] = useState<T | undefined>(undefined);

  const fetchData = async () => {
    try {
      if ("caches" in window) {
        const cache = await caches.open(cachePath);
        const cachedResponse = await cache.match(cachePath);
        if (cachedResponse) {
          let json = await cachedResponse.json();
          if (serialization) {
            json = serialization[1](json); //if we need -> deserialize the data
          }
          setData(json);
        } else {
          const promiseData: T = await cachedFunction;
          const newData = serialization
            ? serialization[0](promiseData)
            : promiseData;
          const newDataAsResponse = new Response(JSON.stringify(newData));
          await cache.put(cachePath, newDataAsResponse);
          setData(promiseData);
        }
      } else {
        console.warn("caches not supported in this browser");
        const promiseData: T = await cachedFunction;
        setData(promiseData);
      }
    } catch (e) {
      console.error("there was an error while fetching the data", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cachePath, cachedFunction, serialization]);

  return [
    data,
    () => {
      setData(undefined);
    },
  ];
}
