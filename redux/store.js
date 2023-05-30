import { combineReducers } from "redux";
import locationReducer from "./locationReducer";

const rootReducer = combineReducers({
  location: locationReducer,
  // Другие редюсеры вашего приложения
});

export default rootReducer;
