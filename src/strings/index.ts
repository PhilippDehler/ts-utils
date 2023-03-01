import { Core } from "../core/functions";
import { Helper } from "../helper";
import { Maths } from "../numbers";
import { Tuples } from "../tuples";
import { StringCore } from "./core";
import { ASCII } from "./tables";

export declare namespace Strings {
  export interface SplitFn extends Core.Fn {
    return: this["arg0"] extends string
      ? this["arg1"] extends string
        ? StringCore.Split<this["arg0"], this["arg1"]>
        : never
      : never;
  }

  export interface $Split<
    Delimiter extends string | Core.unset = Core.unset,
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<SplitFn, [T, Delimiter]> {}

  export interface WordsFn extends Core.Fn {
    return: this["arg0"] extends string
      ? StringCore.Words<this["arg0"]>
      : never;
  }

  export interface $Words<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<WordsFn, [T]> {}

  export interface LengthFn extends Core.Fn {
    return: this["arg0"] extends string
      ? StringCore.Length<this["arg0"]>
      : never;
  }

  export interface $Length<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<LengthFn, [T]> {}

  export interface UppercaseFn extends Core.Fn {
    return: this["arg0"] extends string ? Uppercase<this["arg0"]> : never;
  }

  export interface $Uppercase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<UppercaseFn, [T]> {}

  export interface LowercaseFn extends Core.Fn {
    return: this["arg0"] extends string ? Lowercase<this["arg0"]> : never;
  }

  export interface $LowerCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<LowercaseFn, [T]> {}

  export interface CapitalizeFn extends Core.Fn {
    return: this["arg0"] extends string
      ? StringCore.Capitalize<this["arg0"]>
      : never;
  }

  export interface $Capitalize<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<CapitalizeFn, [T]> {}

  export interface UncapitalizeFn extends Core.Fn {
    return: StringCore.Uncapitalize<this["arg0"]>;
  }

  export interface $Uncapitalize<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<UncapitalizeFn, [T]> {}

  export interface ReplaceFn extends Core.Fn {
    return: StringCore.Replace<this["arg0"], this["arg1"], this["arg2"]>;
  }

  export interface $Replace<
    TMatch extends string | Core.unset = Core.unset,
    TReplace extends string | Core.unset = Core.unset,
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<ReplaceFn, [T, TMatch, TReplace]> {}

  export interface ReplaceAllFn<TMatch extends string, TReplace extends string>
    extends Core.Fn {
    return: StringCore.ReplaceAll<this["arg0"], this["arg1"], this["arg2"]>;
  }

  export interface $ReplaceAll<
    TMatch extends string | Core.unset = Core.unset,
    TReplace extends string | Core.unset = Core.unset,
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<
      ReplaceAllFn<TMatch, TReplace>,
      [T, TMatch, TReplace]
    > {}

  export interface ConcatFn extends Core.Fn {
    return: StringCore.Concat<this["arg0"], this["arg1"]>;
  }

  export interface $Concat<
    T1 extends string | Core.unset = Core.unset,
    T2 extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<ConcatFn, [T1, T2]> {}

  export interface ToNumber extends Core.Fn {
    return: StringCore.ToNumber<this["arg0"]>;
  }

  export interface $ToNumber<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<ToNumber, [T]> {}

  export interface JoinFn extends Core.Fn {
    return: StringCore.Join<this["arg0"], this["arg1"]>;
  }
  type TemplateStrings = number | string;

  export interface $Join<
    Delimiter extends TemplateStrings | Core.unset = Core.unset,
    T extends TemplateStrings[] | Core.unset = Core.unset,
  > extends Core.PartialApply<JoinFn, [T, Delimiter]> {}

  export interface SplitByAlphaNumericGroupsFn extends Core.Fn {
    return: StringCore.SplitByAlphaNumericGroups<this["arg0"]>;
  }

  export interface $SplitByAlphaNumericGroups<
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<SplitByAlphaNumericGroupsFn, [T]> {}

  export interface SplitBeforeASCIIKeyFn extends Core.Fn {
    return: StringCore.SplitBeforeASCIIKey<this["arg0"], this["arg1"]>;
  }

  export interface $SplitBeforeASCIIKey<
    Key extends keyof ASCII.TABLE_BY_KEY | Core.unset = Core.unset,
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<SplitBeforeASCIIKeyFn, [T, Key]> {}

  interface $SnakeCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<
        [Strings.SplitByAlphaNumericGroupsFn, Strings.$Join<"_">]
      >,
      [T]
    > {}

  interface $PascalCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Strings.$SplitByAlphaNumericGroups,
          Tuples.$Map<Strings.CapitalizeFn>,
          Strings.$Join<"">,
        ]
      >,
      [T]
    > {}

  export interface $KebabCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<
        [Strings.SplitByAlphaNumericGroupsFn, Strings.$Join<"-">]
      >,
      [T]
    > {}

  interface $CamelCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<[$PascalCase, Strings.$Uncapitalize]>,
      [T]
    > {}

  export interface $KebabToCamelCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Strings.$Split<"-">,
          Tuples.$Map<Strings.CapitalizeFn>,
          Strings.$Join<"">,
        ]
      >,
      [T]
    > {}

  export interface $KebabToPascalCase<
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Strings.$Split<"-">,
          Tuples.$Map<Strings.CapitalizeFn>,
          Strings.$Join<"">,
        ]
      >,
      [T]
    > {}

  export interface $KebabToSnakeCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<[Strings.$Split<"-">, Strings.$Join<"_">]>,
      [T]
    > {}

  export interface $SnakeToKebabCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<[Strings.$Split<"_">, Strings.$Join<"-">]>,
      [T]
    > {}

  export interface $SnakeToPascalCase<
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Strings.$Split<"_">,
          Tuples.$Map<Strings.$Capitalize>,
          Strings.$Join<"">,
        ]
      >,
      [T]
    > {}

  export interface $SnakeToCamelCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Strings.$Split<"_">,
          Tuples.$Map<Strings.$Capitalize>,
          Strings.$Join<"">,
          Strings.$Uncapitalize,
        ]
      >,
      [T]
    > {}

  export interface $PascalToKebabCase<
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Strings.$Uncapitalize,
          Strings.$SplitBeforeASCIIKey<"UPPERCASE_CHARACTERS">,
          Tuples.$Map<Strings.LowercaseFn>,
          Strings.$Join<"-">,
        ]
      >,
      [T]
    > {}

  export interface $PascalToSnakeCase<
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Strings.$Uncapitalize,
          Strings.$SplitBeforeASCIIKey<"UPPERCASE_CHARACTERS">,
          Tuples.$Map<Strings.LowercaseFn>,
          Strings.$Join<"_">,
        ]
      >,
      [T]
    > {}

  export interface $PascalToCamelCase<
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<Strings.$Uncapitalize, [T]> {}

  export interface $CamelToKebabCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<Strings.$PascalToKebabCase, [T]> {}

  export interface $CamelToSnakeCase<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<Strings.$PascalToSnakeCase, [T]> {}

  export interface $CamelToPascalCase<
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<Strings.$Capitalize, [T]> {}

  export interface TrimLeftFn extends Core.Fn {
    return: StringCore.TrimLeft<this["arg0"]>;
  }

  export interface $TrimLeft<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<TrimLeftFn, [T]> {}

  export interface TrimRightFn extends Core.Fn {
    return: StringCore.TrimRight<this["arg0"]>;
  }

  export interface $TrimRight<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<TrimRightFn, [T]> {}

  export interface TrimFn extends Core.Fn {
    return: StringCore.Trim<this["arg0"]>;
  }

  export interface $Trim<T extends string | Core.unset = Core.unset>
    extends Core.PartialApply<TrimFn, [T]> {}

  export interface RepeatFn extends Core.Fn {
    return: StringCore.Repeat<this["arg0"], this["arg1"]>;
  }

  export interface $Repeat<
    T extends string | Core.unset = Core.unset,
    N extends Maths.NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<RepeatFn, [T, N]> {}

  export interface SliceFn extends Core.Fn {
    return: StringCore.Slice<this["arg0"], this["arg1"], this["arg2"]>;
  }

  export interface $Slice<
    Start extends Maths.NumberInput | Core.unset = Core.unset,
    End extends Maths.NumberInput | Core.unset = Core.unset,
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<SliceFn, [T, Start, End]> {}

  export interface StartsWithFn extends Core.Fn {
    return: StringCore.StartsWith<this["arg0"], this["arg1"]>;
  }

  export interface $StartsWith<
    Match extends string | Core.unset = Core.unset,
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<StartsWithFn, [T, Match]> {}

  export interface EndsWithFn extends Core.Fn {
    return: StringCore.EndsWith<this["arg0"], this["arg1"]>;
  }

  export interface $EndsWith<
    Match extends string | Core.unset = Core.unset,
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<EndsWithFn, [T, Match]> {}

  export interface ContainsFn extends Core.Fn {
    return: StringCore.Contains<this["arg0"], this["arg1"]>;
  }

  export interface $Contains<
    Match extends string | Core.unset = Core.unset,
    T extends string | Core.unset = Core.unset,
  > extends Core.PartialApply<ContainsFn, [T, Match]> {}
}

// test

type Test = Core.Eval<Strings.$Capitalize<"hello">>; // "Hello"
//    ^?
type TTest = Helper.Test<Test, "Hello">;

type Test2 = Core.Eval<Strings.$Uncapitalize<"Hello">>; // "hello"
//     ^?
type TTest2 = Helper.Test<Test2, "hello">;

type Test3 = Core.Eval<Strings.$PascalToKebabCase<"HelloWorld">>; // "hello-world"
//     ^?
type TTest3 = Helper.Test<Test3, "hello-world">;

type Test4 = Core.Eval<Strings.$PascalToSnakeCase<"HelloWorld">>; // "hello_world"
//     ^?
type TTest4 = Helper.Test<Test4, "hello_world">;

type Test5 = Core.Eval<Strings.$PascalToCamelCase<"HelloWorld">>; // "helloWorld"
//    ^?
type TTest5 = Helper.Test<Test5, "helloWorld">;

type Test6 = Core.Eval<Strings.$CamelToKebabCase<"helloWorld">>; // "hello-world"
//    ^?
type TTest6 = Helper.Test<Test6, "hello-world">;

type Test7 = Core.Eval<Strings.$CamelToSnakeCase<"helloWorld">>; // "hello_world"
//    ^?
type TTest7 = Helper.Test<Test7, "hello_world">;

type Test8 = Core.Eval<Strings.$CamelToPascalCase<"helloWorld">>; // "HelloWorld"
//    ^?
type TTest8 = Helper.Test<Test8, "HelloWorld">;

type Test9 = Core.Eval<Strings.$TrimLeft<"  hello">>; // "hello"
//    ^?
type TTest9 = Helper.Test<Test9, "hello">;

type Test10 = Core.Eval<Strings.$TrimRight<"hello  ">>; // "hello"
//     ^?
type TTest10 = Helper.Test<Test10, "hello">;

type Test11 = Core.Eval<Strings.$Trim<"  hello  ">>; // "hello"
//     ^?
type TTest11 = Helper.Test<Test11, "hello">;

type Test12 = Core.Eval<Strings.$Repeat<"hello", 3>>; // "hellohellohello"
//     ^?
type TTest12 = Helper.Test<Test12, "hellohellohello">;

type Test13 = Core.Eval<Strings.$Slice<1, 3, "hello">>; // "el"
//     ^?
type TTest13 = Helper.Test<Test13, "el">;

type Test14 = Core.Eval<Strings.$StartsWith<"hello", "Hello world">>; // false
//     ^?
type TTest14 = Helper.Test<Test14, false>;

type Test15 = Core.Eval<Strings.$EndsWith<"world", "hello world">>; // true
//     ^?
type TTest15 = Helper.Test<Test15, true>;

type Test16 = Core.Eval<Strings.$Contains<"world", "hello world">>; // true
