import React, { Component } from "react"
import uuid from "uuid/v4"

export default class Datepicker extends Component {

    constructor(props) {
        super(props)

        this.id = props.id || `dp_${uuid().replace(/-/g, "")}`
    }

    componentDidMount() {
        const selector = `#${this.id}`;
        $(selector).datetimepicker({
            locale: "zh-cn"
        });
    }

    render() {
        const ID = this.id;
        const hashID = `#${ID}`;

        return (
            <div className="input-group date" id={ID} data-target-input="nearest">
                <input type="text" className="form-control datetimepicker-input" data-target={hashID} />
                <div className="input-group-append" data-target={hashID} data-toggle="datetimepicker">
                    <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                </div>
            </div>
        )
    }
}