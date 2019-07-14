import React from "react"
import classNames from "classnames"
import { Route, Link } from "react-router-ads";

const NavItem = ({ to, icon, active, children }) => {
    const className = classNames("nav-item", { active: active });
    const iconClassName = icon ? classNames("fas", "fa-fw", `fa-${icon}`) : null

    return (
        <li className={className}>
            <Link className="nav-link" to={to}>
                {iconClassName && <i className={iconClassName}></i>}
                <span>{children}</span>
            </Link>
        </li>
    )
}

export default ({ to,children, ...rest }) => {
    const path = typeof to === "object" ? to.pathname : to;
    const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

    return (
        <Route exact path={escapedPath} children={({ match }) => {
            const active = !!match;
            
            return (
                <NavItem {...rest}  to={to} active={active}>
                    {children}                    
                </NavItem>
            );
        }}
        />
    );
};
