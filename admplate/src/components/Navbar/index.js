import React, { Component } from "react"
import isString from "lodash/isString";
import isObject from "lodash/isObject";
import uuid from "uuid/v4"
import classNames from "classnames"
import { withRouter, matchPath } from "react-router-ads"
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import {
    minimizedInitial,
    calcOverlayInitialState,
    toggleSidebarOnBody
} from "./calc";

const buildNavs = ({ children, location, overlay }) => {
    const navs = [];
    const { pathname } = location;
    React.Children.forEach(children, (child) => {
        const { type, props } = child;
        switch (type) {
            case Item:
                const to = isString(props.to) ? props.to : props.to.path;
                navs.push({ type: "item", ...props, active: matchPath(pathname, { path: to }) });
                break;
            case Heading:
                navs.push({ type: "heading", ...props });
                break;
            case Divider:
                navs.push({ type: "divider", ...props });
                break;
            case Group:
                const gp = { type: "group", ...props, id: uuid(), active: false, collapsed: true, children: [] };
                navs.push(gp);
                React.Children.forEach(props.children, (groupChild) => {
                    switch (groupChild.type) {
                        case GroupItem:
                            const to = isString(groupChild.props.to) ? groupChild.props.to : groupChild.props.to.path;
                            const active = matchPath(pathname, { path: to });
                            gp.active = gp.active || active;
                            gp.children.push({ type: "item", ...groupChild.props, active });
                            break;
                        case GroupHeader:
                            gp.children.push({ type: "header", ...groupChild.props });
                            break;
                    }
                });

                gp.collapsed = !gp.active || overlay === "suppress";
                break;
        }
    });

    return navs;
}

const Navbar = ({ href, title, navs, minimized, onGroupClick, onToggleClick }) => {
    toggleSidebarOnBody(minimized);
    const topClassName = classNames("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion", { "toggled": minimized })

    return (
        <ul className={topClassName}>
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href={href || "/"}>
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">{title}</div>
            </a>

            {navs.map((nav, index) => {
                switch (nav.type) {
                    case "item":
                        return (<NavItem key={index} {...nav} />);
                    case "group":
                        return (<NavGroup key={index} {...nav} onClick={onGroupClick} />);
                    case "heading":
                        return (<div key={index} className="sidebar-heading">{nav.children}</div>);
                    case "divider":
                        return (<hr key={index} className={classNames("sidebar-divider", nav.className)} />);
                    default:
                        return null;
                }
            })}

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={onToggleClick}></button>
            </div>
        </ul>
    );
}

class NavbarManager extends Component {
    constructor(props) {
        super(props);

        const overlay = "express";
        this.state = {
            minimized: props.minimized,
            overlay,
            location: { ...props.location },
            navs: buildNavs({ ...props, overlay })
        }
    }

    componentDidMount() {
        window.addEventListener("optimizedResize", this.handleWindowSizeChange, false);

        const minimized = minimizedInitial();
        if (minimized && this.state.minimized !== minimized) {
            const { onToggle } = this.props
            return onToggle(minimized);
        }

        const overlay = calcOverlayInitialState();
        const state = {};
        if (this.state.overlay !== overlay) {
            this.setState({ overlay, navs: buildNavs({ ...this.props, overlay }) });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("optimizedResize", this.handleWindowSizeChange);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.location.pathname !== state.location.pathname) {
            const overlay = calcOverlayInitialState();
            return {
                overlay,
                location: { ...props.location },
                navs: buildNavs({ children: props.children, location: props.location, overlay })
            };
        } else if (props.minimized != state.minimized) {
            return {
                minimized: props.minimized,
                navs: buildNavs({ children: props.children, location: props.location, overlay: "suppress" })
            }
        }

        return null;
    }

    handleWindowSizeChange = () => {
        // Close any open menu accordions when window is resized below 768px        
        const minimized = minimizedInitial();
        if (this.state.minimized !== minimized) {
            const { onToggle } = this.props
            onToggle(minimized);
        }
    }

    handlerGourpClick = (group) => {
        const { navs } = this.state;
        const newNavs = [];
        const targetID = group.id;
        const targetCollapsed = !group.collapsed;

        for (let nav of navs) {
            if (isObject(nav)) {
                if (nav.type === "group" && nav.id === targetID) {
                    newNavs.push({ ...nav, children: [...nav.children], collapsed: targetCollapsed });
                } else if (nav.type === "group") {
                    newNavs.push({ ...nav, children: [...nav.children], collapsed: true });
                } else {
                    newNavs.push({ ...nav });
                }
            }
        }

        this.setState({ navs: newNavs });
    }

    render() {
        const { navs, minimized } = this.state;
        const { onToggle, ...rest } = this.props

        return (
            <Navbar {...rest}
                navs={navs}
                minimized={minimized}
                onGroupClick={this.handlerGourpClick}
                onToggleClick={onToggle}
            />
        );
    }
}

const Item = NavbarManager.Item = () => null;
const Divider = NavbarManager.Divider = () => null;
const Heading = NavbarManager.Heading = () => null;
const Group = NavbarManager.Group = () => null;
const GroupItem = NavbarManager.GroupItem = () => null;
const GroupHeader = NavbarManager.GroupHeader = () => null;

export default withRouter(NavbarManager);