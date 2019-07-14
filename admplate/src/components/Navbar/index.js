import React from "react"
import classNames from "classnames"

import NavItem from "./NavItem"
import NavGroup from "./NavGroup"
import NavGroupItem from "./NavGroupItem"

const NavDivider = ({ className }) => (
    <hr className={classNames("sidebar-divider", className)} />
)

const NavHeading = ({ children }) => (
    <div className="sidebar-heading">{children}</div>
)

const NavGroupItemHeader = ({ children }) => (<h6 className="collapse-header">{children}</h6>)

const Navbar = ({ id, href, title, children }) => {

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id={id}>
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href={href || "/"}>
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">{title}</div>
            </a>

            {children}

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    );
}

Navbar.Item = NavItem;
Navbar.Divider = NavDivider;
Navbar.Heading = NavHeading;
Navbar.Group = NavGroup;
Navbar.GroupItem = NavGroupItem;
Navbar.GroupHeader = NavGroupItemHeader;

export default Navbar;