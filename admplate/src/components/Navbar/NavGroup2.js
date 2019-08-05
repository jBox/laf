import React from "react"
import classNames from "classnames"
import NavGroupItem from "./NavGroupItem"

const NavGroupItemHeader = ({ children }) => (<h6 className="collapse-header">{children}</h6>)

export default ({ id, title, icon, active, collapsed, children, onClick }) => {
    const className = classNames("nav-item", { "active": active });
    const iconClassName = classNames("fas fa-fw", "fa-" + icon);
    const linkClassName = classNames("nav-link", { collapsed: collapsed });
    const collapseClassName = classNames("collapse", { show: !collapsed });

    const handleGroupHeaderClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (onClick) {
            onClick({ id, title, active, collapsed });
        }
    }

    return (
        <li className={className}>
            <a className={linkClassName} href="#" data-toggle="collapse" onClick={handleGroupHeaderClick}>
                <i className={iconClassName}></i>
                <span>{title}</span>
            </a>
            <div className={collapseClassName}>
                <div className="bg-white py-2 collapse-inner rounded">
                    {children.map((child) => {
                        switch (child.type) {
                            case "item":
                                return (<NavGroupItem {...child} />);
                            case "header":
                                return (<NavGroupItemHeader {...child} />);
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </li>
    )
}
