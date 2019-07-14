import React from "react"
import classNames from "classnames"
import { Route, Link } from "react-router-ads";

const NavGroupItem = ({ to, active, children }) => {
    const className = classNames("collapse-item", { "active": active });

    return (<Link className={className} to={to}>{children}</Link>)
}

export default ({ to, children, ...rest }) => {
    const path = typeof to === "object" ? to.pathname : to;
    const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

    return (
        <Route exact path={escapedPath} children={({ match }) => {
            const active = !!match;

            return (
                <NavGroupItem {...rest} to={to} active={active}>
                    {children}
                </NavGroupItem>
            );
        }}
        />
    );
};
