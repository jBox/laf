import React from "react"
import Navbar from "../components/Navbar"


export default () => {

    const target = "accordionSidebar";

    return (
        <Navbar id={target} title="Admplate">    

            <Navbar.Divider className="my-0" />

            <Navbar.Item to="/" icon="tachometer-alt">Dashboard</Navbar.Item>

            <Navbar.Divider />

            <Navbar.Heading>Operation Room Manager</Navbar.Heading>

            <Navbar.Group id="OperationRoom" title="Operation Room" icon="cog" parent={target}>
                <Navbar.GroupHeader>Custom Components:</Navbar.GroupHeader>
                <Navbar.GroupItem to="/operation-room/schedule">Schedule</Navbar.GroupItem>
                <Navbar.GroupItem to="/operation-room/list">Operation Rooms</Navbar.GroupItem>
            </Navbar.Group>

            <Navbar.Divider />

            <Navbar.Heading>Others</Navbar.Heading>

            <Navbar.Group id="Others" title="Others" icon="folder" parent={target}>
                <Navbar.GroupHeader>Login Screens:</Navbar.GroupHeader>
                <Navbar.GroupItem to="buttons.html">Login</Navbar.GroupItem>
                <Navbar.GroupItem to="cards.html">Register</Navbar.GroupItem>
                <Navbar.GroupItem to="cards.html">Forgot Password</Navbar.GroupItem>
                <Navbar.GroupHeader>Other Pages:</Navbar.GroupHeader>
                <Navbar.GroupItem to="cards.html">404 Page</Navbar.GroupItem>
                <Navbar.GroupItem to="cards.html">Blank</Navbar.GroupItem>
            </Navbar.Group>

            <Navbar.Divider className="d-none d-md-block" />

        </Navbar>
    );
}