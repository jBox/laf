import { combineReducers } from "redux";
import sidebar from "./sidebar";
import auth from "./auth";

export default combineReducers({
    sidebar,
    auth
});