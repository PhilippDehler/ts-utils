export type Keys<T extends Object> = keyof Object;
export type ValueOf<T extends Object> = T[keyof T];

export function* keys<T extends Object>(obj: T) {
    for (const key of Object.keys(obj)) yield key as Keys<T>;
}
