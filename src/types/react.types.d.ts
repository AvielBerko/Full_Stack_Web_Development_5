export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export type Nullable<T> = T | null | undefined;
export type OptionalState<T> = [Nullable<T>, React.Dispatch<React.SetStateAction<Nullable<T>>>];
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type OptionalStateSetter<T> = React.Dispatch<React.SetStateAction<Nullable<T>>>;


