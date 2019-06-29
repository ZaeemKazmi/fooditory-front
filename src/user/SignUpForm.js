import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      countryOfOrigin: "",
      accommName: "",
      accommStreet: "",
      accommZipcode: "",
      accommCity: "Munich",
      accommCountry: "Germany",
      error: "",
      open: false
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

  render() {
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Display Name
            </label>
            <input
              type="text"
              id="name"
              className="FormField__Input"
              placeholder="Enter your name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

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
          <h6 className="mt-5 mb-5">Accommodation Details</h6>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Building Number
            </label>
            <input
              type="text"
              id="accommName"
              className="FormField__Input"
              placeholder="Enter your building number"
              name="accommName"
              value={this.state.accommName}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Street
            </label>
            <input
              type="text"
              id="accommStreet"
              className="FormField__Input"
              placeholder="Enter your street name"
              name="accommStreet"
              value={this.state.accommStreet}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Zip Code
            </label>
            <input
              type="text"
              id="accommZipcode"
              className="FormField__Input"
              placeholder="Enter your zip code"
              name="accommZipcode"
              value={this.state.accommZipcode}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              City
            </label>
            <input
              type="text"
              id="accommCity"
              className="FormField__Input"
              name="accommCity"
              value="Munich"
            />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Country
            </label>
            <input
              type="text"
              id="accommCountry"
              className="FormField__Input"
              name="accommZipcode"
              value="Germany"
            />
          </div>

          <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input
                className="FormField__Checkbox"
                type="checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.handleChange}
              />{" "}
              I agree all statements in{" "}
              <a href="" className="FormField__TermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20">Sign Up</button>{" "}
            <Link to="/sign-in" className="FormField__Link">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default SignUpForm;
