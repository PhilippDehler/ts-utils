import { Keys } from './ts-object-utils';

export type OmitDeep<T extends {}, TKeys extends Keys<T>> = Omit<
    {
        [key in Keys<T>]: T[key] extends {} ? OmitDeep<T[key], Keys<T[key]>> : T[key];
    },
    TKeys
>;
export type PartialDeep<T extends {}> = { [key in Keys<T>]?: PartialDeep<T[key]> };

// type PartialDeepTest = PartialDeep<{ a: 's'; b: { b: 's' } }>;
// type OmitDeepTest = OmitDeep<{ a: { b: 's' }; b: { b: 's' } }, 'b'>;
