import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login , authenticate , isAuthenticated } from '../auth';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;

        const user = {
            email,
            password
        };
        console.log(user);
        login(user).then(response => {
            this.setState({ loading: false });
            authenticate(response.data, () => {
                this.setState({ redirectToReferer: true });
            });
        }).catch(err => {
            this.setState({ loading: false });
            console.log(err.response);
            this.setState({ error: "There was error in logging in, please try again." });
        });
    }

    loginForm = (email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}>
                </input>
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                Login
            </button>
        </form>
    );

    render() {
        const { email, password, error, redirectToReferer, loading } = this.state;

        if(isAuthenticated()){
            return <Redirect to="/" />
        }

        if (redirectToReferer) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Login</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ?
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div> : (
                        ""
                    )}

                {this.loginForm(email, password)}
            </div>
        );
    }
}

export default Login;