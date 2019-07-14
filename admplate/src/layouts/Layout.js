import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-browser-router";
import Footer from "../components/Footer"
import Topbar from "../components/Topbar"
import Sidebar from "../containers/Sidebar"

export default class Layout extends Component {
    static defaultProps = {
        routes: []
    }

    static propTypes = {
        routes: PropTypes.array
    }

    render() {
        const { routes } = this.props;
        return (
            <>
                <Sidebar />

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        
                        <div className="container-fluid">
                            <Switch>
                                {routes.map((route, index) => (<Route key={index} {...route} />))}
                            </Switch>
                        </div>
                    </div>

                    <Footer />
                </div>
            </>
        );
    }
}