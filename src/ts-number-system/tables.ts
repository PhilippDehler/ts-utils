import {
  Eight,
  eight,
  Five,
  five,
  Four,
  four,
  GT,
  LT,
  Nine,
  nine,
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

export type CompareTable = {
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
  };
};
