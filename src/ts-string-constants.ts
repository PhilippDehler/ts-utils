import { ValueOf } from './ts-object-utils';
import { Union } from './ts-string-utils';

const upperCaseToLowerCase = {
    A: 'a',
    B: 'b',
    C: 'c',
    D: 'd',
    E: 'e',
    F: 'f',
    G: 'g',
    H: 'h',
    I: 'i',
    J: 'j',
    K: 'k',
    L: 'l',
    M: 'm',
    N: 'n',
    O: 'o',
    P: 'p',
    Q: 'q',
    R: 'r',
    S: 's',
    T: 't',
    U: 'u',
    V: 'v',
    W: 'w',
    X: 'x',
    Y: 'y',
    Z: 'z',
    Ü: 'ü',
    Ö: 'ö',
    Ä: 'ä',
} as const;
const LowerCaseToUpperCase = {
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D',
    e: 'E',
    f: 'F',
    g: 'G',
    h: 'H',
    i: 'I',
    j: 'J',
    k: 'K',
    l: 'L',
    m: 'M',
    n: 'N',
    o: 'O',
    p: 'P',
    q: 'Q',
    r: 'R',
    s: 'S',
    t: 'T',
    u: 'U',
    v: 'V',
    w: 'W',
    x: 'X',
    y: 'Y',
    z: 'Z',
    ü: 'Ü',
    ö: 'Ö',
    ä: 'Ä',
} as const;
export type WhitspaceChars = ' ' | '\n' | '\t';

export type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type SpecialChars =
    | ' '
    | '!'
    | '"'
    | '#'
    | '$'
    | '%'
    | '&'
    | "'"
    | '('
    | ')'
    | '*'
    | '+'
    | '|'
    | '-'
    | '.'
    | '/'
    | ':'
    | ';'
    | '<'
    | '='
    | '>'
    | '?'
    | '@'
    | '['
    | ']'
    | '^'
    | '_'
    | '`'
    | '{'
    | '|'
    | '}'
    | '~'
    | '¡'
    | '§';

export type UpperLowerCharMap = typeof upperCaseToLowerCase;
export type UpperCaseChars = keyof UpperLowerCharMap;
export type LowerToUpperCaseMap = typeof LowerCaseToUpperCase;
export type LowerCaseChars = ValueOf<UpperLowerCharMap>;
export type AllLetters = Union<UpperCaseChars, LowerCaseChars>;
export type AllSpecialChar = Union<Union<SpecialChars, Digits>, WhitspaceChars>;
export type Empty = '';
export type TemplateStringPrimitve = string | number | bigint | boolean | null | undefined;
