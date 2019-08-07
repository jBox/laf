import { createSelector } from "reselect";
import { getReturnUrl } from "../auth"

export default createSelector(
    (state, props) => {
        const { authenticated, landing, user } = state.auth;
        const { location } = props;
        return {
            authenticated,
            landing,
            returnUrl: getReturnUrl(location)
        };
    },
    (auth) => {
        return { auth };
    }
);