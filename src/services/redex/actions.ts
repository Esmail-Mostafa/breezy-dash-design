import { STEP1, STEP2, STEP3, STEP4 } from "./Reducer";

export const step1 = (page1: any) => ({
  type: STEP1,
  payload: page1,
});

export const step2 = (page2: any) => ({
  type: STEP2,
  payload: page2,
});

export const step3 = (page3: any) => ({
  type: STEP3,
  payload: page3,
});

export const step4 = () => ({
  type: STEP4,
});
