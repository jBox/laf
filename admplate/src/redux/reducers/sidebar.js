import { combineReducers } from "redux";
import {
    SIDEBAR_TOGGLE
} from "../actions/ActionTypes";

const minimized = (state = false, action) => {
    switch (action.type) {
        case SIDEBAR_TOGGLE:
            return typeof action.minimized === "boolean" ? action.minimized : !state
        default:
            return state;
    }
};

export default combineReducers({
    minimized
});