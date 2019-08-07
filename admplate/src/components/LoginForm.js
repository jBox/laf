import React, { Component } from "react"
import Checkbox from "./Form/Checkbox"

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.form = {
            username: "",
            password: "",
            rememberme: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { onSubmit } = this.props;
        if (onSubmit) {
            onSubmit({ ...this.form });
        }
    }

    handleUsernameChange = (event) => {
        this.form.username = event.target.value;
    }

    handlePasswordChange = (event) => {
        this.form.password = event.target.value
    }

    handleRemembermeChange = (event) => {
        this.form.rememberme = event.target.checked
    }

    render() {
        return (
            <form className="user" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control form-control-user"
                        id="username"
                        aria-describedby="UserNameHelp"
                        placeholder="用户名"
                        required
                        onChange={this.handleUsernameChange}
                    />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control form-control-user"
                        id="password"
                        placeholder="密码"
                        onChange={this.handlePasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <Checkbox id="rememberCheck" label="保持登录" onChange={this.handleRemembermeChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-user btn-block">登录</button>
            </form>
        )
    }
}


export default LoginForm;