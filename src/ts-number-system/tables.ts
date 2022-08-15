import {
  Eight,
  eight,
  Five,
  five,
  Four,
  four,
  GT,
  infinity,
  LT,
  Nine,
  nine,
  NotANumber,
  One,
  one,
  SAME,
  Seven,
  seven,
  Six,
  six,
  Three,
  three,
  Two,
  two,
  Zero,
  zero,
} from "./constants";

export type BitCompareTable = {
  [zero]: {
    [zero]: SAME;
    [one]: LT;
    [two]: LT;
    [three]: LT;
    [four]: LT;
    [five]: LT;
    [six]: LT;
    [seven]: LT;
    [eight]: LT;
    [nine]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [one]: {
    [zero]: GT;
    [one]: SAME;
    [two]: LT;
    [three]: LT;
    [four]: LT;
    [five]: LT;
    [six]: LT;
    [seven]: LT;
    [eight]: LT;
    [nine]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [two]: {
    [zero]: GT;
    [one]: GT;
    [two]: SAME;
    [three]: LT;
    [four]: LT;
    [five]: LT;
    [six]: LT;
    [seven]: LT;
    [eight]: LT;
    [nine]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [three]: {
    [zero]: GT;
    [one]: GT;
    [two]: GT;
    [three]: SAME;
    [four]: LT;
    [five]: LT;
    [six]: LT;
    [seven]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
    [eight]: LT;
    [nine]: LT;
  };
  [four]: {
    [zero]: GT;
    [one]: GT;
    [two]: GT;
    [three]: GT;
    [four]: SAME;
    [five]: LT;
    [six]: LT;
    [seven]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
    [eight]: LT;
    [nine]: LT;
  };
  [five]: {
    [zero]: GT;
    [one]: GT;
    [two]: GT;
    [three]: GT;
    [four]: GT;
    [five]: SAME;
    [six]: LT;
    [seven]: LT;
    [eight]: LT;
    [nine]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [six]: {
    [zero]: GT;
    [one]: GT;
    [two]: GT;
    [three]: GT;
    [four]: GT;
    [five]: GT;
    [six]: SAME;
    [seven]: LT;
    [eight]: LT;
    [nine]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [seven]: {
    [zero]: GT;
    [one]: GT;
    [two]: GT;
    [three]: GT;
    [four]: GT;
    [five]: GT;
    [six]: GT;
    [seven]: SAME;
    [eight]: LT;
    [nine]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [eight]: {
    [zero]: GT;
    [one]: GT;
    [two]: GT;
    [three]: GT;
    [four]: GT;
    [five]: GT;
    [six]: GT;
    [seven]: GT;
    [eight]: SAME;
    [nine]: LT;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [nine]: {
    [zero]: GT;
    [one]: GT;
    [two]: GT;
    [three]: GT;
    [four]: GT;
    [five]: GT;
    [six]: GT;
    [seven]: GT;
    [eight]: GT;
    [nine]: SAME;
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [infinity]: {
    [zero]: [SAME, typeof zero];
    [one]: [SAME, typeof zero];
    [two]: [SAME, typeof zero];
    [three]: [SAME, typeof zero];
    [four]: [SAME, typeof zero];
    [five]: [SAME, typeof zero];
    [six]: [SAME, typeof zero];
    [seven]: [SAME, typeof zero];
    [eight]: [SAME, typeof zero];
    [nine]: [SAME, typeof zero];
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
  [NotANumber]: {
    [zero]: [SAME, typeof zero];
    [one]: [SAME, typeof zero];
    [two]: [SAME, typeof zero];
    [three]: [SAME, typeof zero];
    [four]: [SAME, typeof zero];
    [five]: [SAME, typeof zero];
    [six]: [SAME, typeof zero];
    [seven]: [SAME, typeof zero];
    [eight]: [SAME, typeof zero];
    [nine]: [SAME, typeof zero];
    [infinity]: [SAME, typeof zero];
    [NotANumber]: [SAME, typeof zero];
  };
};

export type AddingTable = {
  [zero]: {
    [zero]: [Zero, Zero];
    [one]: [One, Zero];
    [two]: [Two, Zero];
    [three]: [Three, Zero];
    [four]: [Four, Zero];
    [five]: [Five, Zero];
    [six]: [Six, Zero];
    [seven]: [Seven, Zero];
    [eight]: [Eight, Zero];
    [nine]: [Nine, Zero];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [one]: {
    [zero]: [One, Zero];
    [one]: [Two, Zero];
    [two]: [Three, Zero];
    [three]: [Four, Zero];
    [four]: [Five, Zero];
    [five]: [Six, Zero];
    [six]: [Seven, Zero];
    [seven]: [Eight, Zero];
    [eight]: [Nine, Zero];
    [nine]: [Zero, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [two]: {
    [zero]: [Two, Zero];
    [one]: [Three, Zero];
    [two]: [Four, Zero];
    [three]: [Five, Zero];
    [four]: [Six, Zero];
    [five]: [Seven, Zero];
    [six]: [Eight, Zero];
    [seven]: [Nine, Zero];
    [eight]: [Zero, One];
    [nine]: [One, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [three]: {
    [zero]: [Three, Zero];
    [one]: [Four, Zero];
    [two]: [Five, Zero];
    [three]: [Six, Zero];
    [four]: [Seven, Zero];
    [five]: [Eight, Zero];
    [six]: [Nine, Zero];
    [seven]: [Zero, One];
    [eight]: [One, One];
    [nine]: [Two, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [four]: {
    [zero]: [Four, Zero];
    [one]: [Five, Zero];
    [two]: [Six, Zero];
    [three]: [Seven, Zero];
    [four]: [Eight, Zero];
    [five]: [Nine, Zero];
    [six]: [Zero, One];
    [seven]: [One, One];
    [eight]: [Two, One];
    [nine]: [Three, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [five]: {
    [zero]: [Five, Zero];
    [one]: [Six, Zero];
    [two]: [Seven, Zero];
    [three]: [Eight, Zero];
    [four]: [Nine, Zero];
    [five]: [Zero, One];
    [six]: [One, One];
    [seven]: [Two, One];
    [eight]: [Three, One];
    [nine]: [Four, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [six]: {
    [zero]: [Six, Zero];
    [one]: [Seven, Zero];
    [two]: [Eight, Zero];
    [three]: [Nine, Zero];
    [four]: [Zero, One];
    [five]: [One, One];
    [six]: [Two, One];
    [seven]: [Three, One];
    [eight]: [Four, One];
    [nine]: [Five, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [seven]: {
    [zero]: [Seven, Zero];
    [one]: [Eight, Zero];
    [two]: [Nine, Zero];
    [three]: [Zero, One];
    [four]: [One, One];
    [five]: [Two, One];
    [six]: [Three, One];
    [seven]: [Four, One];
    [eight]: [Five, One];
    [nine]: [Six, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [eight]: {
    [zero]: [Eight, Zero];
    [one]: [Nine, Zero];
    [two]: [Zero, One];
    [three]: [One, One];
    [four]: [Two, One];
    [five]: [Three, One];
    [six]: [Four, One];
    [seven]: [Five, One];
    [eight]: [Six, One];
    [nine]: [Seven, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [nine]: {
    [zero]: [Nine, Zero];
    [one]: [Zero, One];
    [two]: [One, One];
    [three]: [Two, One];
    [four]: [Three, One];
    [five]: [Four, One];
    [six]: [Five, One];
    [seven]: [Six, One];
    [eight]: [Seven, One];
    [nine]: [Eight, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [infinity]: {
    [zero]: [typeof infinity, typeof zero];
    [one]: [typeof infinity, typeof zero];
    [two]: [typeof infinity, typeof zero];
    [three]: [typeof infinity, typeof zero];
    [four]: [typeof infinity, typeof zero];
    [five]: [typeof infinity, typeof zero];
    [six]: [typeof infinity, typeof zero];
    [seven]: [typeof infinity, typeof zero];
    [eight]: [typeof infinity, typeof zero];
    [nine]: [typeof infinity, typeof zero];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [NotANumber]: {
    [zero]: [typeof NotANumber, typeof zero];
    [one]: [typeof NotANumber, typeof zero];
    [two]: [typeof NotANumber, typeof zero];
    [three]: [typeof NotANumber, typeof zero];
    [four]: [typeof NotANumber, typeof zero];
    [five]: [typeof NotANumber, typeof zero];
    [six]: [typeof NotANumber, typeof zero];
    [seven]: [typeof NotANumber, typeof zero];
    [eight]: [typeof NotANumber, typeof zero];
    [nine]: [typeof NotANumber, typeof zero];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
};

export type SubtractionTable = {
  [zero]: {
    [zero]: [Zero, Zero];
    [one]: [Nine, One];
    [two]: [Eight, One];
    [three]: [Seven, One];
    [four]: [Six, One];
    [five]: [Five, One];
    [six]: [Four, One];
    [seven]: [Three, One];
    [eight]: [Two, One];
    [nine]: [One, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [one]: {
    [zero]: [One, Zero];
    [one]: [Zero, Zero];
    [two]: [Nine, One];
    [three]: [Eight, One];
    [four]: [Seven, One];
    [five]: [Six, One];
    [six]: [Five, One];
    [seven]: [Four, One];
    [eight]: [Three, One];
    [nine]: [Two, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [two]: {
    [zero]: [Two, Zero];
    [one]: [One, Zero];
    [two]: [Zero, Zero];
    [three]: [Nine, One];
    [four]: [Eight, One];
    [five]: [Seven, One];
    [six]: [Six, One];
    [seven]: [Five, One];
    [eight]: [Four, One];
    [nine]: [Three, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [three]: {
    [zero]: [Three, Zero];
    [one]: [Two, Zero];
    [two]: [One, Zero];
    [three]: [Zero, Zero];
    [four]: [Nine, One];
    [five]: [Eight, One];
    [six]: [Seven, One];
    [seven]: [Six, One];
    [eight]: [Five, One];
    [nine]: [Four, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [four]: {
    [zero]: [Four, Zero];
    [one]: [Three, Zero];
    [two]: [Two, Zero];
    [three]: [One, Zero];
    [four]: [Zero, Zero];
    [five]: [Nine, One];
    [six]: [Eight, One];
    [seven]: [Seven, One];
    [eight]: [Six, One];
    [nine]: [Five, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [five]: {
    [zero]: [Five, Zero];
    [one]: [Four, Zero];
    [two]: [Three, Zero];
    [three]: [Two, Zero];
    [four]: [One, Zero];
    [five]: [Zero, Zero];
    [six]: [Nine, One];
    [seven]: [Eight, One];
    [eight]: [Seven, One];
    [nine]: [Six, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [six]: {
    [zero]: [Six, Zero];
    [one]: [Five, Zero];
    [two]: [Four, Zero];
    [three]: [Three, Zero];
    [four]: [Two, Zero];
    [five]: [One, Zero];
    [six]: [Zero, Zero];
    [seven]: [Nine, One];
    [eight]: [Eight, One];
    [nine]: [Seven, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [seven]: {
    [zero]: [Seven, Zero];
    [one]: [Six, Zero];
    [two]: [Five, Zero];
    [three]: [Four, Zero];
    [four]: [Three, Zero];
    [five]: [Two, Zero];
    [six]: [One, Zero];
    [seven]: [Zero, Zero];
    [eight]: [Nine, One];
    [nine]: [Eight, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [eight]: {
    [zero]: [Eight, Zero];
    [one]: [Seven, Zero];
    [two]: [Six, Zero];
    [three]: [Five, Zero];
    [four]: [Four, Zero];
    [five]: [Three, Zero];
    [six]: [Two, Zero];
    [seven]: [One, Zero];
    [eight]: [Zero, Zero];
    [nine]: [Nine, One];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [nine]: {
    [zero]: [Nine, Zero];
    [one]: [Eight, Zero];
    [two]: [Seven, Zero];
    [three]: [Six, Zero];
    [four]: [Five, Zero];
    [five]: [Four, Zero];
    [six]: [Three, Zero];
    [seven]: [Two, Zero];
    [eight]: [One, Zero];
    [nine]: [Zero, Zero];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [infinity]: {
    [zero]: [typeof infinity, typeof zero];
    [one]: [typeof infinity, typeof zero];
    [two]: [typeof infinity, typeof zero];
    [three]: [typeof infinity, typeof zero];
    [four]: [typeof infinity, typeof zero];
    [five]: [typeof infinity, typeof zero];
    [six]: [typeof infinity, typeof zero];
    [seven]: [typeof infinity, typeof zero];
    [eight]: [typeof infinity, typeof zero];
    [nine]: [typeof infinity, typeof zero];

    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [NotANumber]: {
    [zero]: [typeof NotANumber, typeof zero];
    [one]: [typeof NotANumber, typeof zero];
    [two]: [typeof NotANumber, typeof zero];
    [three]: [typeof NotANumber, typeof zero];
    [four]: [typeof NotANumber, typeof zero];
    [five]: [typeof NotANumber, typeof zero];
    [six]: [typeof NotANumber, typeof zero];
    [seven]: [typeof NotANumber, typeof zero];
    [eight]: [typeof NotANumber, typeof zero];
    [nine]: [typeof NotANumber, typeof zero];
    [infinity]: [typeof NotANumber, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
};

export type MultiplicationTable = {
  [zero]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof zero, typeof zero];
    [two]: [typeof zero, typeof zero];
    [three]: [typeof zero, typeof zero];
    [four]: [typeof zero, typeof zero];
    [five]: [typeof zero, typeof zero];
    [six]: [typeof zero, typeof zero];
    [seven]: [typeof zero, typeof zero];
    [eight]: [typeof zero, typeof zero];
    [nine]: [typeof zero, typeof zero];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [one]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof one, typeof zero];
    [two]: [typeof two, typeof zero];
    [three]: [typeof three, typeof zero];
    [four]: [typeof four, typeof zero];
    [five]: [typeof five, typeof zero];
    [six]: [typeof six, typeof zero];
    [seven]: [typeof seven, typeof zero];
    [eight]: [typeof eight, typeof zero];
    [nine]: [typeof nine, typeof zero];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [two]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof two, typeof zero];
    [two]: [typeof four, typeof zero];
    [three]: [typeof six, typeof zero];
    [four]: [typeof eight, typeof zero];
    [five]: [typeof zero, typeof one];
    [six]: [typeof two, typeof one];
    [seven]: [typeof four, typeof one];
    [eight]: [typeof six, typeof one];
    [nine]: [typeof eight, typeof one];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [three]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof three, typeof zero];
    [two]: [typeof six, typeof zero];
    [three]: [typeof nine, typeof zero];
    [four]: [typeof two, typeof one];
    [five]: [typeof five, typeof one];
    [six]: [typeof eight, typeof one];
    [seven]: [typeof one, typeof two];
    [eight]: [typeof four, typeof two];
    [nine]: [typeof seven, typeof two];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [four]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof four, typeof zero];
    [two]: [typeof eight, typeof zero];
    [three]: [typeof two, typeof one];
    [four]: [typeof six, typeof one];
    [five]: [typeof zero, typeof two];
    [six]: [typeof four, typeof two];
    [seven]: [typeof eight, typeof two];
    [eight]: [typeof two, typeof three];
    [nine]: [typeof six, typeof three];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [five]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof five, typeof zero];
    [two]: [typeof zero, typeof one];
    [three]: [typeof five, typeof one];
    [four]: [typeof zero, typeof two];
    [five]: [typeof five, typeof two];
    [six]: [typeof zero, typeof three];
    [seven]: [typeof five, typeof three];
    [eight]: [typeof zero, typeof four];
    [nine]: [typeof five, typeof four];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [six]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof six, typeof zero];
    [two]: [typeof two, typeof one];
    [three]: [typeof eight, typeof one];
    [four]: [typeof four, typeof two];
    [five]: [typeof zero, typeof three];
    [six]: [typeof six, typeof three];
    [seven]: [typeof two, typeof four];
    [eight]: [typeof eight, typeof four];
    [nine]: [typeof four, typeof five];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [seven]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof seven, typeof zero];
    [two]: [typeof four, typeof one];
    [three]: [typeof one, typeof two];
    [four]: [typeof eight, typeof two];
    [five]: [typeof five, typeof three];
    [six]: [typeof two, typeof four];
    [seven]: [typeof nine, typeof four];
    [eight]: [typeof six, typeof five];
    [nine]: [typeof three, typeof six];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [eight]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof eight, typeof zero];
    [two]: [typeof six, typeof one];
    [three]: [typeof four, typeof two];
    [four]: [typeof two, typeof three];
    [five]: [typeof zero, typeof four];
    [six]: [typeof eight, typeof four];
    [seven]: [typeof six, typeof five];
    [eight]: [typeof four, typeof six];
    [nine]: [typeof two, typeof seven];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [nine]: {
    [zero]: [typeof zero, typeof zero];
    [one]: [typeof nine, typeof zero];
    [two]: [typeof eight, typeof one];
    [three]: [typeof seven, typeof two];
    [four]: [typeof six, typeof three];
    [five]: [typeof five, typeof four];
    [six]: [typeof four, typeof five];
    [seven]: [typeof three, typeof six];
    [eight]: [typeof two, typeof seven];
    [nine]: [typeof one, typeof eight];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [infinity]: {
    [zero]: [typeof infinity, typeof zero];
    [one]: [typeof infinity, typeof zero];
    [two]: [typeof infinity, typeof zero];
    [three]: [typeof infinity, typeof zero];
    [four]: [typeof infinity, typeof zero];
    [five]: [typeof infinity, typeof zero];
    [six]: [typeof infinity, typeof zero];
    [seven]: [typeof infinity, typeof zero];
    [eight]: [typeof infinity, typeof zero];
    [nine]: [typeof infinity, typeof zero];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
  [NotANumber]: {
    [zero]: [typeof NotANumber, typeof zero];
    [one]: [typeof NotANumber, typeof zero];
    [two]: [typeof NotANumber, typeof zero];
    [three]: [typeof NotANumber, typeof zero];
    [four]: [typeof NotANumber, typeof zero];
    [five]: [typeof NotANumber, typeof zero];
    [six]: [typeof NotANumber, typeof zero];
    [seven]: [typeof NotANumber, typeof zero];
    [eight]: [typeof NotANumber, typeof zero];
    [nine]: [typeof NotANumber, typeof zero];
    [infinity]: [typeof infinity, typeof zero];
    [NotANumber]: [typeof NotANumber, typeof zero];
  };
};
