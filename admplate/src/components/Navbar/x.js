import React, { Component } from "react"
import isString from "lodash/isString";
import isObject from "lodash/isObject";
import uuid from "uuid/v4"
import classNames from "classnames"
import { withRouter, matchPath } from "react-router-ads"
import NavItem from "./NavItem";
import NavGroup from "./NavGroup2";

const calcActiveOverlayState = (typeof window === "undefined") ?
    () => ("open") : () => (window.innerWidth >= 768 ? "open" : "supress")

const Item = () => null

const Divider = () => null

const Heading = () => null

const Group = () => null

const GroupItem = () => null

const GroupHeader = () => null

const Navbar = ({ href, title, navs, onGroupClick }) => {

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href={href || "/"}>
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">{title}</div>
            </a>

            {navs.map((nav) => {
                switch (nav.type) {
                    case "item":
                        return (<NavItem {...nav} />);
                    case "group":
                        return (<NavGroup {...nav} onClick={onGroupClick} />);
                    case "heading":
                        return (<div className="sidebar-heading">{nav.children}</div>);
                    case "divider":
                        return (<hr className={classNames("sidebar-divider", nav.className)} />);
                    default:
                        return null;
                }
            })}

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    );
}

class NavbarManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.location.pathname,
            overlay: "open"
        }

        this.state.navs = this.navs();
    }

    componentDidMount() {
        const overlay = calcActiveOverlayState();
        if (this.state.overlay !== overlay) {
            this.setState({ overlay })
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.location.pathname !== state.location) {
            return {
                location: props.location.pathname,
                overlay: calcActiveOverlayState()
            };
        }

        return null;
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

    navs = () => {
        const navs = [];
        const { children, location: { pathname } } = this.props;
        const { overlay } = this.state;
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

    render() {
        const { navs } = this.state;

        return (
            <Navbar {...this.props}
                navs={navs}
                onGroupClick={this.handlerGourpClick}
            />
        );
    }
}

NavbarManager.Item = Item;
NavbarManager.Divider = Divider;
NavbarManager.Heading = Heading;
NavbarManager.Group = Group;
NavbarManager.GroupItem = GroupItem;
NavbarManager.GroupHeader = GroupHeader;

export default withRouter(NavbarManager);