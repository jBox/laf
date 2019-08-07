import {
    INIT_LOGIN,
    LANDING_LOGIN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    RESET_LOGIN
} from "./ActionTypes";

import Jwt from "../auth/Jwt";

export const initialLogin = (isLanding) => (dispatch) => {
    const token = Jwt.verify();
    if (token) {
        Jwt.refresh().catch(() => {/* ignore */ });
        return dispatch({
            type: INIT_LOGIN,
            data: token
        });
    } else {
        Jwt.refresh().then((data) => {
            return dispatch({
                type: INIT_LOGIN,
                data
            })
        }).catch(() => {
            /* ignore */
            if (isLanding) {
                dispatch({ type: LANDING_LOGIN });
            }
        });
    }
};

export const login = (username, password, rememberme) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const token = await Jwt.authenticate(username, password, rememberme);
        return dispatch({
            type: LOGIN_SUCCESS,
            data: token
        })
    } catch (error) {
        return dispatch({
            type: LOGIN_FAILURE,
            error
        })
    }
};

export const resetLogin = () => ({
    type: RESET_LOGIN
});
