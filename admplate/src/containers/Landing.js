import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import { Redirect } from "react-router-ads";

import landingSelector from "../redux/selectors/landing";
import { initialLogin } from "../redux/actions/login";

class Landing extends Component {

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const { auth } = nextProps;
        if (!isEqual(auth, prevState.auth)) {
            const state = { auth };
            if (auth.authenticated) {
                state.returnUrl = auth.returnUrl;
            } else if (auth.landing) {
                state.returnUrl = `/login?returnUrl=${encodeURIComponent(auth.returnUrl || "/")}`;
            }

            return state;
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            auth: { ...props.auth }
        };
    }

    componentDidMount() {
        const { auth } = this.props;
        if (auth.authenticated) {
            this.setState({ returnUrl: auth.returnUrl });
        }

        const { initialLogin } = this.props;
        if (initialLogin) {
            initialLogin(true);
        }
    }

    render() {
        const { returnUrl } = this.state;

        if (returnUrl) {
            return (<Redirect to={returnUrl} />);
        }

        return (
            <div className="progress" style={{ "marginTop": "50px" }}>
                <div className="progress-bar progress-bar-striped bg-warning" role="progressbar"
                    style={{ "width": "100%" }}
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100">
                </div>
            </div >
        );
    }
}

export default connect(landingSelector, {
    initialLogin
})(Landing);