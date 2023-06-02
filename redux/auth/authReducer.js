const initialState = {
  photo: "",
  name: "",
  email: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PHOTO":
      return {
        ...state,
        photo: action.payload,
      };
    case "SAVE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SAVE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
