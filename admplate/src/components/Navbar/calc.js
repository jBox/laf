export const minimizedInitial = (typeof window === "undefined") ? () => (false) :
    () => {
        if (window.innerWidth >= 768) {
            return false;
        }

        return true;
    }

export const calcOverlayInitialState = (typeof window === "undefined") ? () => ("express") :
    () => {
        // sidebar-toggled
        if (window.innerWidth >= 768 && !document.body.classList.contains("sidebar-toggled")) {
            return "express";
        }

        return "suppress";
    }

export const toggleSidebarOnBody = (typeof window === "undefined") ? () => (false) :
    (minimized) => {
        if (minimized) {
            document.body.classList.add("sidebar-toggled");
        } else {
            document.body.classList.remove("sidebar-toggled");
        }
    }