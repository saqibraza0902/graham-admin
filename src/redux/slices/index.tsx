import { combineReducers } from "redux";
import sellerslice from "./sellerslice";
import auth from "./auth";
import buyerslice from "./buyerslice";
import dateslice from "./dateslice";
const rootReducer = combineReducers({
  id: sellerslice,
  auth: auth,
  buyer: buyerslice,
  date: dateslice,
});

export default rootReducer;
