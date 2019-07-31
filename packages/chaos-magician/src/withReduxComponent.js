import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

export default (store, monitor) => (comp) => {
    return class ReduxWrappedComponent extends Component {
        constructor(props, context) {
            super(props, context);
            this.store = store;
            this.monitor = monitor;
        }

        render() {
            return (
                <Provider store={this.store}>
                    {comp}
                </Provider>
            );
        }
    };
};
