import React from "react"
import classNames from "classnames"
import { RouterContext, matchPath } from "react-router-ads"

const NavGroup = ({ id, title, icon, parent, active, children }) => {
    const className = classNames("nav-item", { "active": active });
    const iconClassName = classNames("fas fa-fw", "fa-" + icon);
    const linkClassName = classNames("nav-link", { collapsed: !active });
    const collapseClassName = classNames("collapse", { show: active });

    return (
        <li className={className}>
            <a className={linkClassName} href="#" data-toggle="collapse" data-target={"#" + id} aria-expanded="true" aria-controls={id} >
                <i className={iconClassName}></i>
                <span>{title}</span>
            </a>
            <div id={id} className={collapseClassName} aria-labelledby={id} data-parent={"#" + parent}>
                <div className="bg-white py-2 collapse-inner rounded">
                    {children}
                </div>
            </div>
        </li>
    )
}


export default ({ children, ...rest }) => {
    const childrenPath = [];

    React.Children.forEach(children, (child) => {
        const { to } = child.props;
        const path = typeof to === "object" ? to.pathname : to;
        const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        if (escapedPath) {
            childrenPath.push(escapedPath)
        }
    });

    return (
        <RouterContext.Consumer>
            {(context) => {
                const currentLocation = context.location;
                const { pathname: pathToMatch } = currentLocation;

                const active = childrenPath.reduce((match, escapedPath) => {
                    return match || !!matchPath(pathToMatch, { path: escapedPath });
                }, false);

                return (
                    <NavGroup {...rest} active={active}>{children}</NavGroup>
                );
            }}
        </RouterContext.Consumer>
    );
};
