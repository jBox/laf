import Jwt from "./Jwt";
import qs from "qs";

export const getReturnUrl = (location) => {
    if (location && location.search) {
        const query = qs.parse(location.search.substr(1));
        for (const key of Object.keys(query)) {
            if (/^returnUrl$/ig.test(key)) {
                return decodeURIComponent(query[key] || "/");
            }
        }
    }

    return "/";
};

export const authenticate = () => {
    const token = Jwt.verify();
    if (token) {
        return { success: true };
    }

    return { redirect: "/landing?returnUrl={0}" };
};