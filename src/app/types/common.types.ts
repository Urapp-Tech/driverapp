export type Nullable<T> = T | null;

export type KeyOf<T> = keyof T;

export type ValueOf<T> = T[KeyOf<T>];
