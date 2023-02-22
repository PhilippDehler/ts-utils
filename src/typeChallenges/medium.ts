import { Init, Last, ValuesOf } from "../ts-array-utils";
import { Decrement, InitCounter } from "../ts-counter";
import { throwNotImplemented } from "../ts-utils";

const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};
type MyReturnType<T extends Function> = T extends (...args: any[]) => infer R
  ? R
  : never;
type a = MyReturnType<typeof fn>; // should be "1 | 2"
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type MyOmit<T, K extends keyof T> = {
  [U in keyof T as U extends K ? never : U]: T[U];
};

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type MyReadonly2<T, U extends keyof T> = {
  [K in keyof T as K extends U ? never : K]: T[K];
} & { readonly [K in U]: T[K] };

const todo0: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};
type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

type Todo2 = DeepReadonly<X>; // should be same as `Expected`

// todo0.title = "Hello"; // Error: cannot reassign a readonly property
// todo0.description = "barFoo"; // Error: cannot reassign a readonly property
todo0.completed = true; // OK
type Arr = ["1", "2", "3"];

type Test = ValuesOf<Arr>; // expected to be '1' | '2' | '3'

type Chainable<T extends unknown = unknown> = {
  option: <K extends PropertyKey, V>(
    key: K,
    value: V,
  ) => Chainable<{ [U in K]: V } & T>;
  get: () => T;
};

declare const config: Chainable;
const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1

type arr3 = ["a", "b", "c", "d"];
type arr4 = [3, 2, 1];
export type Pop<T extends unknown[]> = Init<T>;
type re1 = Pop<arr3>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr4>; // expected to be [3, 2]

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
type PromiseAll_<T> = T extends readonly [infer Head, ...infer Tail]
  ? [MyAwaited<Head>, ...PromiseAll_<Tail>]
  : [];

type MyAwaited<T> = T extends Promise<infer U> ? U : T;

function PromiseAll<T extends readonly unknown[]>(p: T): PromiseAll_<T> {
  return throwNotImplemented();
}
// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type LookUp<T, K> = T & { type: K };

type MyDogType = LookUp<Cat | Dog, "dog">; // expected to be `Dog`

type Fibonacci<
  T extends number,
  C extends unknown[] = Decrement<InitCounter<T>>,
> = C extends [unknown] | []
  ? [unknown]
  : [...Fibonacci<T, Decrement<C>>, ...Fibonacci<T, Decrement<Decrement<C>>>];

type A = Fibonacci<3>["length"];
