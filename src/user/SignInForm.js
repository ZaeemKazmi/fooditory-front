import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login, authenticate, isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
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
        this.setState({ error: err.response.data.error });
      });
  };

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="FormCenter">
        <form
          onSubmit={this.handleSubmit}
          className="FormFields"
          onSubmit={this.handleSubmit}
        >
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="FormField__Input"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="FormField__Input"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <button
              onClick={this.clickSubmit}
              className="FormField__Button mr-20"
            >
              Sign In
            </button>{" "}
            <Link to="/" className="FormField__Link">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
