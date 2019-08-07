import React from "react"
import uuid from "uuid/v4"

export default ({ id, label, defaultChecked, onChange }) => {
    id = id || `cb_${uuid().replace(/-/ig, "")}`;

    return (
        <div className="custom-control custom-checkbox small">
            <input type="checkbox"
                className="custom-control-input"
                id={id}
                defaultChecked={defaultChecked}
                onChange={onChange}
            />
            <label className="custom-control-label" htmlFor={id}>{label}</label>
        </div>
    )
}