import React from "react"
import PageHeader from "../../components/PageHeader"

export default () => {
    return (
        <>
        <PageHeader>手术申请</PageHeader>
        <form>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">病人号</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="病人号" />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
                </div>
            </div>
            <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                            <label className="form-check-label" htmlFor="gridRadios1">
                                First radio
          </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                            <label className="form-check-label" htmlFor="gridRadios2">
                                Second radio
          </label>
                        </div>
                        <div className="form-check disabled">
                            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
                            <label className="form-check-label" htmlFor="gridRadios3">
                                Third disabled radio
          </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className="form-group row">
                <div className="col-sm-2">Checkbox</div>
                <div className="col-sm-10">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck1" />
                        <label className="form-check-label" htmlFor="gridCheck1">
                            Example checkbox
        </label>
                    </div>
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