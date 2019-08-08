import isObject from "lodash/isObject";
import fetch from "chaos-fetch";
import jwtDecode from "jwt-decode";

const formContentType = "application/x-www-form-urlencoded";

class MemoryStorage {
    constructor() {
        this.data = {};
    }
    getItem(key) {
        return this.data[key];
    }
    setItem(key, value) {
        this.data[key] = value;
    }
    removeItem(key) {
        delete this.data[key];
    }
}

/*const getBaseUrl = () => {
    if (typeof document !== "undefined") {
        const item = document.querySelector(`meta[name="API_BASE_URL"]`);
        if (item && item.content) {
            return item.content;
        }
    }

    return "/";
};*/

function Jwt() {
    const baseUrl = "/";
    const KEY = "__JWT_KEY_";
    const storage = {
        local: typeof localStorage !== "undefined" ? localStorage : new MemoryStorage(),
        session: typeof sessionStorage !== "undefined" ? sessionStorage : new MemoryStorage()
    };

    const getToken = () => {
        const session = storage.session.getItem(KEY);
        if (session) {
            return JSON.parse(session);
        }

        const local = storage.local.getItem(KEY);
        if (local) {
            return { ...JSON.parse(local), rememberme: true };
        }

        return {};
    };

    const setToken = (token, rememberme) => {
        if (isObject(token)) {
            try {
                const { exp } = jwtDecode(token.access_token) || {};
                const str = JSON.stringify({ ...token, expires_at: exp * 1000 });
                if (rememberme) {
                    storage.local.setItem(KEY, str)
                } else {
                    storage.session.setItem(KEY, str);
                }
            } catch (ex) {
                console.error("Save jwt failed.", ex);
            }
        }
    };

    const clearToken = () => {
        storage.local.removeItem(KEY);
        storage.session.removeItem(KEY);
        return true;
    };

    this.authenticate = (username, password, rememberme) => {
        const url = `${baseUrl}oauth/token`;
        const request = {
            method: "POST",
            body: { username, password },
            headers: { "Content-Type": formContentType }
        };
        return fetch(url, request).then((res) => {
            setToken(res.data, rememberme);
            return { ...res.data, rememberme };
        }).catch((error) => {
            const interError = error.error || error;
            return Promise.reject(interError.message);
        });
    };

    this.verify = () => {
        const token = getToken();
        if (token.expires_at > Date.now()) {
            return token;
        }

        return null;
    };

    this.refresh = () => {
        const { refresh_token, rememberme } = getToken();
        if (!refresh_token) {
            return Promise.reject("Refresh tokon failed.");
        }

        const url = `${baseUrl}oauth/refresh`;
        const request = {
            method: "POST",
            body: { token: refresh_token },
            headers: { "Content-Type": formContentType }
        };
        return fetch(url, request).then((res) => {
            setToken(res.data, rememberme);
            return { ...res.data, rememberme };
        }).catch((error) => {
            const interError = error.error || error;
            return Promise.reject(interError.message);
        });
    };

    this.revoke = () => {
        const { refresh_token } = getToken();
        if (refresh_token) {
            const url = `${baseUrl}oauth/revoke`;
            const request = {
                method: "POST",
                body: { token: refresh_token },
                headers: { "Content-Type": formContentType }
            };
            return fetch(url, request).then((res) => {
                return clearToken();
            }).catch(() => {
                return Promise.resolve(clearToken());
            });
        }
    };
}

export default new Jwt();