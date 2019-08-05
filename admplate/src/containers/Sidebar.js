import React from "react"
import Navbar from "../components/Navbar"
import { connect } from "react-redux"
import { toggle } from "../redux/actions/sidebar"
import sidebarSelector from "../redux/selectors/sidebar"

const Sidebar = ({ minimized, handleNavbarToggle }) => {

    const target = "accordionSidebar";

    return (
        <Navbar id={target} minimized={minimized} title="Admplate" onToggle={handleNavbarToggle}>

            <Navbar.Divider className="my-0" />

            <Navbar.Item to="/" icon="tachometer-alt">首页</Navbar.Item>

            <Navbar.Divider />

            <Navbar.Group id="OperationRoom" title="手术室管理" icon="cog">
                <Navbar.GroupItem to="/operation/schedule/room">手术排班</Navbar.GroupItem>
                <Navbar.GroupItem to="/operation/apply/room">手术申请</Navbar.GroupItem>
                <Navbar.GroupItem to="/operation/cancel/room">手术撤销</Navbar.GroupItem>
                <Navbar.GroupItem to="/operation/notice/room">手术通知</Navbar.GroupItem>
            </Navbar.Group>

            <Navbar.Divider />

            <Navbar.Group id="Others" title="系统" icon="folder">
                <Navbar.GroupItem to="/sys/options">系统设置</Navbar.GroupItem>
            </Navbar.Group>

            <Navbar.Divider className="d-none d-md-block" />

        </Navbar>
    );
}

export default connect(sidebarSelector, {
    handleNavbarToggle: toggle
})(Sidebar);