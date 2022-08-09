import { ExoticNumber, Operations, Plus } from "./constants";

type CalculatorMap<
  A extends ExoticNumber,
  B extends ExoticNumber,
  Operation extends Operations = Plus,
> = {
  [plus]: {
    [positive]: {
      [positive]: Calculate<A, B, Add>;
      [negative]: Compare<A["value"], B["value"]> extends SAME
        ? [Zero]
        : never | Compare<A["value"], B["value"]> extends LT
        ? SubN<B, A>
        : never | Compare<A["value"], B["value"]> extends GT
        ? Calculate<A, B, Sub>
        : never;
    };
    [negative]: {
      [positive]: // -A+B
      Compare<A["value"], B["value"]> extends SAME
        ? [Zero]
        : never | Compare<A["value"], B["value"]> extends LT
        ? Calculate<B, A, Sub>
        : never | Compare<A["value"], B["value"]> extends GT
        ? SubN<B, A>
        : never;
      [negative]: Calculate<A, B, Add>;
    };
  };
  [minus]: {
    [positive]: {
      [positive]: Compare<A["value"], B["value"]> extends SAME
        ? [Zero]
        : never | Compare<A["value"], B["value"]> extends LT
        ? SubN<A, B>
        : never | Compare<A["value"], B["value"]> extends GT
        ? Calculate<A, B, Sub>
        : never;
      [negative]: Calculate<A, B, Add>;
    };
    [negative]: {
      [positive]: Calculate<A, B, Add>;
      [negative]: Compare<A["value"], B["value"]> extends SAME
        ? [Zero]
        : never | Compare<A["value"], B["value"]> extends LT
        ? Calculate<B, A, Sub>
        : never | Compare<A["value"], B["value"]> extends GT
        ? SubN<B, A>
        : never;
    };
  };
}[Operation][A["sign"]][B["sign"]];
