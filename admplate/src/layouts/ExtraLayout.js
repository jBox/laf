import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-ads";

export default class ExtraLayout extends Component {
    static defaultProps = {
        routes: []
    }

    static propTypes = {
        routes: PropTypes.array
    }

    componentDidMount() {
        this.previousBodyClassName = document.body.className;
        document.body.className = "bg-gradient-primary";

        this.rootWrapper = document.getElementById("root");
        if (this.rootWrapper) {
            this.previousWrapperClassName = this.rootWrapper.className;
            this.rootWrapper.className = "container";
        }
    }

    componentWillUnmount() {
        document.body.className = this.previousBodyClassName;
        if (this.rootWrapper) {
            this.rootWrapper.className = this.previousWrapperClassName;
            this.rootWrapper = null;
        }
    }

    render() {
        const { routes } = this.props;
        return (
            <Switch>
                {routes.map((route, index) => (<Route key={index} {...route} />))}
            </Switch>
        );
    }
}