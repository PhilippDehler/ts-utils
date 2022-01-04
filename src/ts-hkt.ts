// https://stackoverflow.com/questions/60007436/higher-order-type-functions-in-typescript

export interface HKT<I = unknown, O = unknown> {
    [Hkt.isHkt]: never;
    [Hkt.input]: I;
    [Hkt.output]: O;
}

export declare namespace Hkt {
    const isHkt: unique symbol;
    const input: unique symbol;
    const output: unique symbol;

    type Input<T extends HKT<any, any>> = T[typeof Hkt.input];

    type Output<T extends HKT<any, any>, I extends Input<T>> = (T & { [input]: I })[typeof output];

    interface Compose<O, A extends HKT<any, O>, B extends HKT<any, Input<A>>>
        extends HKT<Input<B>, O> {
        [output]: Output<A, Output<B, Input<this>>>;
    }

    interface Constant<T, I = unknown> extends HKT<I, T> {}
}
