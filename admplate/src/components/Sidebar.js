import React from "react"
import classNames from "classnames"

const NavItem = ({ href, icon, label }) => {
    href = href || "#"

    const iconClassName = icon ? classNames("fas", "fa-fw", `fa-${icon}`) : null

    return (
        <li className="nav-item">
            <a className="nav-link" href={href}>
                {iconClassName && <i className={iconClassName}></i>}
                <span>{label}</span>
            </a>
        </li>
    )
}

const NavDivider = ({ className }) => (
    <hr className={classNames("sidebar-divider", className)} />
)

const NavHeading = ({ children }) => (
    <div className="sidebar-heading">{children}</div>
)

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

const NavGroupItem = ({ href, active, children }) => {
    href = href || "#"
    const className = classNames("collapse-item", { "active": active });

    return (<a className={className} href={href}>{children}</a>)
}

const NavGroupItemHeader = ({ children }) => (<h6 className="collapse-header">{children}</h6>)

export default () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Admplate</div>
            </a>

            <NavDivider className="my-0" />

            <NavItem label="Dashboard" icon="tachometer-alt" />

            <NavDivider />

            <NavHeading>Interface</NavHeading>

            <NavGroup id="collapseTwo" title="Components" icon="cog" parent="accordionSidebar">
                <NavGroupItemHeader>Custom Components:</NavGroupItemHeader>
                <NavGroupItem href="buttons.html">Buttons</NavGroupItem>
                <NavGroupItem href="cards.html">Cards</NavGroupItem>
            </NavGroup>

            <NavGroup id="collapseUtilities" title="Utilities" icon="wrench" parent="accordionSidebar">
                <NavGroupItemHeader>Custom Utilities:</NavGroupItemHeader>
                <NavGroupItem href="buttons.html">Colors</NavGroupItem>
                <NavGroupItem href="cards.html">Borders</NavGroupItem>
                <NavGroupItem href="cards.html">Animations</NavGroupItem>
                <NavGroupItem href="cards.html">Other</NavGroupItem>
            </NavGroup>

            <NavDivider />

            <NavHeading>Addons</NavHeading>

            <NavGroup id="collapsePages" title="Pages" icon="folder" parent="accordionSidebar" active>
                <NavGroupItemHeader>Login Screens:</NavGroupItemHeader>
                <NavGroupItem href="buttons.html">Login</NavGroupItem>
                <NavGroupItem href="cards.html">Register</NavGroupItem>
                <NavGroupItem href="cards.html">Forgot Password</NavGroupItem>
                <NavGroupItemHeader>Other Pages:</NavGroupItemHeader>
                <NavGroupItem href="cards.html">404 Page</NavGroupItem>
                <NavGroupItem href="cards.html" active>Blank</NavGroupItem>
            </NavGroup>

            <NavDivider className="d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    );
}