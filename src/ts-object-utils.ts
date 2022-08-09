export type Keys<T extends object> = keyof T;
export type ValueOf<T extends object> = T[Keys<T>];

export function* keys<T extends object>(obj: T) {
  for (const key of Object.keys(obj)) yield key as Keys<T>;
}
export type IsEmptyObject<T extends object> = keyof T extends never
  ? true
  : false;
export type RemoveNeverValues<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};
