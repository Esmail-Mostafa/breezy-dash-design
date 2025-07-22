// const initialState = {

//   page1: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//   },
//   page2: {
//     product: "laptop",
//     quantity: 1,
//     requirements: "",
//   },
//   page3: {},
//   page4: [],
// };

const initialState = [
  {
    page1: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
    },
    page2: {
      product: "laptop",
      quantity: 1,
      requirements: "",
    },
    page3: {
      paymentMethod: "credit",
      address: "",
      city: "",
      state: "",
      zip: "",
      deliveryDate: "",
    },
    page4: [],
  },
];

export const STEP1 = "STEP1";
export const STEP2 = "STEP2";
export const STEP3 = "STEP3";
export const STEP4 = "STEP4";

export const orderReducer = (state = initialState, action: any) => {

  switch (action.type) {
    case STEP1:
      state[0].page1 = action.payload;
      return state;
    case STEP2:
      state[0].page2 = action.payload;
      return state;
    case STEP3:
      state[0].page3 = action.payload;
      return state;
    case STEP4:
      state[0].page4 = action.payload;
      return state;
    default:
      return state;
  }
};
