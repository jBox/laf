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

const NavDeading = ({ children }) => (
    <div className="sidebar-heading">{children}</div>
)

const NavGroup = ({ children }) => {
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog"></i>
                <span>Components</span>
            </a>
            <div id={id} className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    {children}
                </div>
            </div>
        </li>
    )
}

const NavGroupItem = ({ href, children }) => {
    href = href || "#"

    return (<a className="collapse-item" href={href}>{children}</a>)
}

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

            <NavDeading>Interface</NavDeading>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Components</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <a className="collapse-item" href="buttons.html">Buttons</a>
                        <a className="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <a className="collapse-item" href="utilities-color.html">Colors</a>
                        <a className="collapse-item" href="utilities-border.html">Borders</a>
                        <a className="collapse-item" href="utilities-animation.html">Animations</a>
                        <a className="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div>
            </li>

            <NavDivider />

            <div className="sidebar-heading">Addons</div>

            <li className="nav-item active">
                <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div id="collapsePages" className="collapse show" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <a className="collapse-item" href="login.html">Login</a>
                        <a className="collapse-item" href="register.html">Register</a>
                        <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6>
                        <a className="collapse-item" href="404.html">404 Page</a>
                        <a className="collapse-item active" href="blank.html">Blank Page</a>
                    </div>
                </div>
            </li>


            <li className="nav-item">
                <a className="nav-link" href="charts.html">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></a>
            </li>


            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tables</span></a>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    );
}