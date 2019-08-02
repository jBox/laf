import React from "react"
import classNames from "classnames"
import styles from "./OperationRoom.css"

export default ({ num, children }) => {
    return (
        <div className={classNames("card border-left-primary shadow h-100 py-2", styles.room)}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col-md-4 mr-2">
                        <div className="h1 mb-0 font-weight-bold text-gray-800">{num}</div>
                    </div>
                    <div className="col-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const OperationInfo = ({ indicator, children }) => (
    <div>{indicator}: <code>{children}</code></div>
)
