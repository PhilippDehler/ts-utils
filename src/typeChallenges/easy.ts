import { Concat, Head, Length, Push, Unshift } from "../ts-array-utils";
import { Difference } from "../ts-union-utils";

type ChallengePick<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P];
};
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = ChallengePick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface Todo {
  title: string;
  description: string;
}

const todo1: MyReadonly<Todo> = {
  title: "Hey",
  completed: false,
  description: "foobar",
};

// todo1.title = "Hello"; // Error: cannot reassign a readonly property
// todo1.description = "barFoo"; // Error: cannot reassign a readonly property

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type TupleToObject<T> = T extends readonly [
  infer Head extends string,
  ...infer Tail,
]
  ? {
      [K in Head]: Head;
    } & TupleToObject<Tail>
  : {};

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = Head<arr1>; // expected to be 'a'
type head2 = Head<arr2>; // expected to be 3

type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT",
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

type Result = Difference<"a" | "b" | "c", "a">; // 'b' | 'c'

type ExampleType = Promise<string>;
type MyAwaited<T> = T extends Promise<infer U> ? U : T;

type Result1 = MyAwaited<ExampleType>; // string
type If<T extends boolean, A, B> = T extends true ? A : B;
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'
type Result2 = Concat<[1], [2]>; // expected to be [1, 2]
type Includes<T extends unknown[], U> = [U] extends [T[number]] ? true : false;
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dino">; // expected to be `false`
type Result3 = Push<[1, 2], "3">; // [1, 2, '3']
type Result4 = Unshift<[1, 2], 0>; // [0, 1, 2]
const foo = (arg1: string, arg2: number): void => {};
type MyParameters<T extends Function> = T extends (...args: infer U) => unknown
  ? U
  : never;
type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
