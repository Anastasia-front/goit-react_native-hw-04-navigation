import { combineReducers } from "redux";
import postReducer from "./post/postReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  post: postReducer,
  auth: authReducer,
  // Другие редюсеры вашего приложения
});

export default rootReducer;
