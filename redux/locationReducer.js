import { SAVE_LOCATION } from "./locationActions";

const initialState = null;

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOCATION:
      return action.payload;
    default:
      return state;
  }
};

export default locationReducer;
