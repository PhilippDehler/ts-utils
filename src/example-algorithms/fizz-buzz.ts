import { Map, Range } from '../ts-array-utils';
import { Hkt, HKT } from '../ts-hkt';
import { Five, Modulo, ParseTsNumber, Three, Zero } from '../ts-number-system';

type Fizz<num> = Modulo<ParseTsNumber<num>, Three>;
type Buzz<num> = Modulo<ParseTsNumber<num>, Five>;

type Fizzbuzz<num> = num extends number
    ? Zero extends Fizz<num> & Buzz<num>
        ? 'FizzBuzz'
        : Zero extends Fizz<num>
        ? 'Fizz'
        : Zero extends Buzz<num>
        ? 'Buzz'
        : num
    : never;

interface FizzbuzzHKT extends HKT<number, Fizzbuzz<any>> {
    [Hkt.output]: Fizzbuzz<Hkt.Input<this>>;
}
// type r = Range<1, 50>;
type FizzbuzzTest = Map<Range<1, 10>, FizzbuzzHKT>;
