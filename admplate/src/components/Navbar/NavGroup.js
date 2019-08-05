import React, { Component } from "react"
import classNames from "classnames"
import { RouterContext, matchPath } from "react-router-ads"

class NavGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: props.active
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.active !== state.active) {
            return {
                active: props.active
            };
        }

        return null;
    }

    handleGroupHeaderClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            active: !this.state.active
        })
    }

    render() {
        const { title, icon, showActiveOverlay, children } = this.props;
        const { active } = this.state;

        const className = classNames("nav-item", { "active": active });
        const iconClassName = classNames("fas fa-fw", "fa-" + icon);
        const linkClassName = classNames("nav-link", { collapsed: !active });
        const collapseClassName = classNames("collapse", { show: active && showActiveOverlay });

        return (
            <li className={className}>
                <a className={linkClassName} href="#" data-toggle="collapse" onClick={this.handleGroupHeaderClick}>
                    <i className={iconClassName}></i>
                    <span>{title}</span>
                </a>
                <div className={collapseClassName}>
                    <div className="bg-white py-2 collapse-inner rounded">
                        {children}
                    </div>
                </div>
            </li>
        )
    }
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
