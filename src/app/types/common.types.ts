export type Nullable<T> = T | null;

export type keyOf<T> = keyof T;

export type ValueOf<T> = T[keyOf<T>];
