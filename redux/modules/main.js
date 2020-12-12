export const SET_GREETING = "main/SET_GREETING";

const initialState = {
  greeting: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_GREETING: {
      return {
        ...state,
        greeting: action.greeting,
      };
    }
    default:
      return state;
  }
}
