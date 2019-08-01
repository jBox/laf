import React from "react"
import Navbar from "../components/Navbar"


export default () => {

    const target = "accordionSidebar";

    return (
        <Navbar id={target} title="Admplate">    

            <Navbar.Divider className="my-0" />

            <Navbar.Item to="/" icon="tachometer-alt">首页</Navbar.Item>

            <Navbar.Divider />

            <Navbar.Heading>手术室管理</Navbar.Heading>

            <Navbar.Group id="OperationRoom" title="手术室" icon="cog" parent={target}>
                <Navbar.GroupHeader>手术室:</Navbar.GroupHeader>
                <Navbar.GroupItem to="/operation-room/schedule">手术排班</Navbar.GroupItem>
                <Navbar.GroupItem to="/operation-room/apply">手术申请</Navbar.GroupItem>
                <Navbar.GroupItem to="/operation-room/cancel">手术撤销</Navbar.GroupItem>
                <Navbar.GroupItem to="/operation-room/notice">手术通知</Navbar.GroupItem>
            </Navbar.Group>

            <Navbar.Divider />

            <Navbar.Heading>系统</Navbar.Heading>

            <Navbar.Group id="Others" title="系统" icon="folder" parent={target}>
                <Navbar.GroupItem to="buttons.html">系统设置</Navbar.GroupItem>
            </Navbar.Group>

            <Navbar.Divider className="d-none d-md-block" />

        </Navbar>
    );
}