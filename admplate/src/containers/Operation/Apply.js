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
                        <label htmlFor="pid">病人号</label>
                        <input type="text" className="form-control" id="pid" placeholder="病人号" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="apply_datetime">预约手术时间</label>
                        <Datepicker id="apply_datetime" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="count">台次</label>
                        <input type="text" className="form-control" id="count" placeholder="台次" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="position">手术室位置</label>
                        <input type="text" className="form-control" id="position" placeholder="手术室位置" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="doctor">手术医生</label>
                        <input type="text" className="form-control" id="doctor" placeholder="手术医生" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="narcosis">麻醉方法</label>
                        <input type="text" className="form-control" id="narcosis" placeholder="麻醉方法" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="note">备注</label>
                        <textarea className="form-control" id="note" rows="3" placeholder="备注"></textarea>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="name">姓名</label>
                        <input type="text" className="form-control" id="name" placeholder="姓名" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="sex">性别</label>
                        <input type="text" className="form-control" id="sex" placeholder="性别" required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="bad_num">床号</label>
                        <input type="text" className="form-control" id="bad_num" placeholder="床号" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary">申请</button>
                    </div>
                </div>
            </form>
        </>
    );
}