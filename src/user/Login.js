import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { login, authenticate, isAuthenticated } from "../auth";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;

    const user = {
      email,
      password
    };
    console.log(user);
    login(user)
      .then(response => {
        this.setState({ loading: false });
        authenticate(response.data, () => {
          this.setState({ redirectToReferer: true });
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err.response);
        this.setState({
          error: "There was error in logging in, please try again."
        });
      });
  };

  loginForm = (email, password) => (
    <div className="col-md-4 col-md-offset-4" id="login">
      <section id="inner-wrapper" className="login">
        <article>
          <form>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-envelope"> </i>
                </span>
                <input
                  onChange={this.handleChange("email")}
                  type="email"
                  className="form-control"
                  value={email}
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-key"> </i>
                </span>
                <input
                  onChange={this.handleChange("password")}
                  type="password"
                  className="form-control"
                  value={password}
                  placeholder="Password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.clickSubmit}
            >
              Login
            </button>
            <div className="forgot text-center">
              <a className="text-center" href="/signup">
                New User?
              </a>
            </div>
          </form>
        </article>
      </section>
    </div>
  );

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-body" style={{ height: "100vh" }}>
        <div className="container" style={{ paddingTop: "7%" }}>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            ""
          )}

          {this.loginForm(email, password)}
        </div>
      </div>
    );
  }
}

export default Login;
