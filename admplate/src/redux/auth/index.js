import Jwt from "./Jwt";

export const authenticate = () => {
    const token = Jwt.verify();
    if (token) {
        return { success: true };
    }

    return { redirect: "/login?returnUrl={0}" };
};

export const adminAuth = () => {
    const auth = authenticate();
    if (auth.success) {
        const user = Jwt.user();
        if (user.roles.includes("admin") || user.roles.includes("super")) {
            return { success: true };
        }

        return { redirect: "/access/denied" };
    }

    return auth;
};