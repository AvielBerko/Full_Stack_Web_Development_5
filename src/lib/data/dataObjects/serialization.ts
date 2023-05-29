import { Serializiation } from "../../../types/dataObjects.types";
import { Nullable } from "../../../types/react.types";
import DataObject from "./DataObject";
import User from "./User";

type Constructor<T> = new (props: any) => T;

export default function getSerialization<T extends DataObject>(
  classType: Constructor<T>
): Serializiation<Nullable<T>> {
  return [
    (t: Nullable<T>) => {
      if (t == null) {
        return t;
      }
      return t.toUnknowObject();
    },
    (u: unknown) => {
      if (u == null) return null;
      return new classType(u);
    },
  ];
}

export const UserSerializer = getSerialization(User);
