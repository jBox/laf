import React from "react"
import PageHeader from "../../components/PageHeader"
import Datepicker from "../../components/Datepicker"

export default () => {
    return (
        <>
            <PageHeader>手术申请</PageHeader>
            <form>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label for="pid">病人号</label>
                        <input type="text" className="form-control" id="pid" placeholder="病人号" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label for="apply_datetime">预约手术时间</label>
                        <Datepicker id="apply_datetime" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label for="count">台次</label>
                        <input type="text" className="form-control" id="count" placeholder="台次" required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </form>
        </>
    );
}