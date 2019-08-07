import React, { Component } from "react";
import { Link } from "react-router-ads"
import LoginForm from "../components/LoginForm"

class Login extends Component {
    constructor(props) {
        super(props);
    }

    login = (form) => {
        console.log(form)
    }

    render() {

        return (
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">欢迎回来</h1>
                                        </div>
                                        <LoginForm onSubmit={this.login} />
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to="/forgot-password">忘记密码?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Login;
