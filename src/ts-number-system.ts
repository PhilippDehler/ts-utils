import { Length } from './ts-array-utils';
import { Not } from './ts-boolean-utils';
import { Empty } from './ts-string-constants';
import { Concat, GetStringLength, Repeat_, StringTail, UnionToArr } from './ts-string-utils';

export type TsNumber = string;
export type Zero = Empty;
export type One = '0';
export type Two = '00';
export type Three = '000';
export type Four = '0000';
export type Five = '00000';
export type Six = '000000';
export type Seven = '0000000';
export type Eight = '00000000';
export type Nine = '000000000';
type Ten = ParseTsNumber<10>;

export type GetNumber<T> = GetStringLength<T>;
export type ParseTsNumber<n, TAgg extends TsNumber = Zero> = GetNumber<TAgg> extends n
    ? TAgg
    : ParseTsNumber<n, Add<One, TAgg>>;

export type Decrement<T> = T extends Empty ? never : StringTail<T>;
export type Increment<T extends TsNumber> = Add<T, One>;

export type Add<TAddend0 extends string, TAddend1 extends TsNumber> = Concat<TAddend0, TAddend1>;
export type Subtract<TMinuend, TSubtrahend> = TSubtrahend extends Zero
    ? TMinuend
    : Subtract<Decrement<TMinuend>, Decrement<TSubtrahend>>;

export type Multiply<T0 extends TsNumber, T1 extends TsNumber> = Repeat_<T0, T1>;
export type Division<
    T0 extends TsNumber,
    T1 extends TsNumber,
    TAgg extends TsNumber = Zero
> = TAgg extends T1
    ? Decrement<T0> extends never
        ? One
        : Add<One, Division<T0, T1, Zero>>
    : Division<Decrement<T0>, T1, Add<One, TAgg>>;

export type Factorial<T extends TsNumber> = T extends One | Zero | never
    ? One
    : Multiply<T, Factorial<Decrement<T>>>;

export type Modulo<
    T extends TsNumber,
    TMod extends TsNumber,
    TAgg extends TsNumber = Zero
> = Decrement<T> extends never
    ? TAgg extends TMod
        ? Zero
        : TAgg
    : TAgg extends TMod
    ? Modulo<T, TMod, Zero>
    : Modulo<Decrement<T>, TMod, Increment<TAgg>>;

export type IsOdd<T extends TsNumber> = Modulo<T, Two> extends One ? true : false;
export type IsEven<T extends TsNumber> = Not<IsOdd<T>>;

export type IsDivisor<T extends TsNumber, TDivisor extends TsNumber> = Modulo<
    T,
    TDivisor
> extends Zero
    ? true
    : false;

export type Divisors<T extends TsNumber, TAgg extends TsNumber = One> = TAgg extends T
    ? TAgg
    : IsDivisor<T, TAgg> extends true
    ? TAgg | Divisors<T, Increment<TAgg>>
    : Divisors<T, Increment<TAgg>>;

export type IsPrime<T extends TsNumber> = Length<UnionToArr<Divisors<T>>> extends 2 ? true : false;

export type GetNthPrime<
    T extends TsNumber,
    TAgg extends TsNumber = Two
> = IsPrime<TAgg> extends true
    ? Decrement<T> extends Zero
        ? TAgg
        : GetNthPrime<Decrement<T>, Increment<TAgg>>
    : GetNthPrime<T, Increment<TAgg>>;

export type Fibonacci<T extends TsNumber> = T extends '000' | Two | One | Zero
    ? One
    : Add<Fibonacci<Subtract<T, Two>>, Fibonacci<Decrement<T>>>;

type TestDivisor = Divisors<Ten>;
type TestPrime = IsPrime<Five>;
type TestFibonacci = GetNumber<Fibonacci<Ten>>;
type IsEvenTest = IsEven<Three>;
type IsEvenTest1 = IsEven<Ten>;
type IsOddTest = IsOdd<Three>;
type IsOddTest1 = IsOdd<Ten>;

//Itype TestFactorial = GetNumber<Factorial<Five>>;
// type TestModulo = GetNumber<Modulo<Ten, ParseNumber<11>>>;
// type MultiplyTest = GetNumber<Multiply<Ten, '0000'>>;
// type DivisionTest = GetNumber<Division<Multiply<Ten, '00000'>, Ten>>;
// type GetNumberTest = GetNumber<Decrement<ParseNumber<2>>>;
// type TestIsDivisor = IsDivisor<Ten, Two>;
// type TestIsDivisor1 = IsDivisor<Ten, Three>;
