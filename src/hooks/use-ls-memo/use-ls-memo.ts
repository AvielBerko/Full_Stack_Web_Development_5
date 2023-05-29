import { useCallback, useEffect,useState } from "react";
import { Serializiation } from "../../types/dataObjects.types";
import { useLocaleStorage } from "../use-local-storage/use-storage";
import { StateSetter } from "../../types/react.types";

export type StorageMemoIdentefierType<T> = {
    key:string,
    promiseToStore?:Promise<T>,
};

/**
 * memoize a promise in the local storage
 * @param key the key to store the data
 * @param promiseToStore the promise to store is results
 * @param serialization the serialization to use if needed
 * @returns [the memoaiized data,a funciton to set the promise, a function to clear the memoization]
 */
export function useLocaleStorageMemo<T>(key:string,promiseToStore?:Promise<T>,serialization?:Serializiation<T>):[T|undefined,StateSetter<StorageMemoIdentefierType<T>>,()=>void]{


    const undefinableSerialization = useCallback(<T>(serialization?:Serializiation<T>):Serializiation<T|undefined>=>{
        return [
            (data:T|undefined)=>{
                if(data===undefined){
                    return undefined;
                }
                return serialization![0](data);
            }, (data:unknown)=>{
                if(data===undefined){
                    return undefined;
                }
                return serialization![1](data);
            }
        ]
    },[serialization]);
    const [storedIdentefier,setStoredIdentefier] = useState<StorageMemoIdentefierType<T>>({key,promiseToStore});
    const [data,setData] = useLocaleStorage<T|undefined>(storedIdentefier?.key??key,undefined,undefinableSerialization(serialization));


    useEffect(()=>{
        if(!storedIdentefier.promiseToStore){
            return;
        }
        if(data==undefined){
            storedIdentefier.promiseToStore.then((data)=>{
                console.log(data)
                setData(data);
            });
        }   
    },[storedIdentefier,data]);

    return [data,setStoredIdentefier,()=>{setData(undefined)}];

}