export type Serializiation<T> = [(t:T)=>unknown,(u:unknown)=>T]
export type Constructor<T> = new (...args: any[]) => T;