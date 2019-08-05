import { createSelector } from "reselect";

export default createSelector(
    (state) => state.sidebar,
    (sidebar) => {
        return sidebar;
    }
);