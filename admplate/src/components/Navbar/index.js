import React, { Component } from "react"
import classNames from "classnames"
import { withRouter } from "react-router-ads"
import NavItem from "./NavItem"
import NavGroup from "./NavGroup"
import NavGroupItem from "./NavGroupItem"

const calcActiveOverlayState = (typeof window === "undefined") ?
    () => (false) : () => (window.innerWidth >= 768)

const NavDivider = ({ className }) => (
    <hr className={classNames("sidebar-divider", className)} />
)

const NavHeading = ({ children }) => (
    <div className="sidebar-heading">{children}</div>
)

const NavGroupItemHeader = ({ children }) => (<h6 className="collapse-header">{children}</h6>)

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.location.pathname,
            showActiveOverlay: true
        }
    }

    componentDidMount() {
        const showActiveOverlay = calcActiveOverlayState();
        if (this.state.showActiveOverlay !== showActiveOverlay) {
            this.setState({ showActiveOverlay })
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.location.pathname !== state.location) {
            return {
                location: props.location.pathname,
                showActiveOverlay: calcActiveOverlayState()
            };
        }

        return null;
    }

    render() {
        const { id, href, title, children } = this.props;
        const { showActiveOverlay } = this.state;

        const childrenWithProps = React.Children.map(children, (child) =>
            React.cloneElement(child, { showActiveOverlay })
        );

        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id={id}>
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href={href || "/"}>
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">{title}</div>
                </a>

                {childrenWithProps}

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        );
    }
}

Navbar.Item = NavItem;
Navbar.Divider = NavDivider;
Navbar.Heading = NavHeading;
Navbar.Group = NavGroup;
Navbar.GroupItem = NavGroupItem;
Navbar.GroupHeader = NavGroupItemHeader;

export default withRouter(Navbar);