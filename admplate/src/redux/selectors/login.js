import { createSelector } from "reselect";
import { getReturnUrl } from "../auth"

export default createSelector(
    (state, props) => {
        const { authenticated } = state.auth;
        const { location } = props;
        return {
            authenticated,
            returnUrl: getReturnUrl(location)
        };
    },
    (auth) => {
        return { auth };
    }
);