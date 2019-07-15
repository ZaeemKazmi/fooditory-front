import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signup, isAuthenticated } from "../auth";

const axios = require("axios");

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      image: "",
      countryOfOrigin: "",
      accommName: "",
      accommStreet: "",
      accommZipcode: "",
      accommCity: "Munich",
      accommCountry: "Germany",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ open: false });
    this.setState({ [name]: event.target.value });

    if (name === "image") {
      this.setState({ [name]: event.target.files[0] });
    }
  };

  clickSubmit = event => {
    event.preventDefault();

    const {
      name,
      email,
      password,
      image,
      countryOfOrigin,
      accommName,
      accommStreet,
      accommZipcode,
      accommCity,
      accommCountry
    } = this.state;

    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
      countryOfOrigin: countryOfOrigin,
      accommodation: {
        name: accommName,
        street: accommStreet,
        zipcode: accommZipcode,
        city: accommCity,
        country: accommCountry
      }
    };
    console.log(user);
    var self = this;
    var bodyFormData = new FormData();
    bodyFormData.set("name", this.state.name);
    bodyFormData.set("email", this.state.email);
    bodyFormData.set("password", this.state.password);
    bodyFormData.append("image", this.state.image);
    bodyFormData.set("countryOfOrigin", this.state.countryOfOrigin);
    bodyFormData.set("accommName", this.state.accommName);
    bodyFormData.set("accommStreet", this.state.accommStreet);
    bodyFormData.set("accommZipcode", this.state.accommZipcode);
    bodyFormData.set("accommCity", this.state.accommCity);
    bodyFormData.set("accommCountry", this.state.accommCountry);

    for (var key of bodyFormData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    axios({
      method: "post",
      url: "http://localhost:8080/signup",
      data: bodyFormData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function(response) {
        self.setState({
          name: "",
          email: "",
          password: "",
          image: "",
          countryOfOrigin: "",
          accommName: "",
          accommStreet: "",
          accommZipcode: "",
          error: "",
          open: false
        });
        console.log(response);
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status !== 200) {
          var errmsg = err.response.data.error;

          if (errmsg === undefined) {
            this.setState({
              error: "Fields cannot be empty!"
            });
          } else if (
            JSON.stringify(err.response.data.error).includes("E11000")
          ) {
            this.setState({ error: "Email already exist!" });
          } else {
            this.setState({ error: err.response.data.error });
          }
        }
      });
  };

  signupForm = (
    name,
    email,
    password,
    image,
    countryOfOrigin,
    accommName,
    accommStreet,
    accommZipcode,
    accommCity,
    accommCountry
  ) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Display Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Image</label>
        <input
          id="image"
          onChange={this.handleChange("image")}
          type="File"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Country Of Origin</label>
        <input
          onChange={this.handleChange("countryOfOrigin")}
          type="text"
          className="form-control"
          value={countryOfOrigin}
        />
      </div>

      <h4 className="mt-5 mb-5">Accommodation Details</h4>
      <div className="form-group">
        <label className="text-muted">Building Number</label>
        <input
          onChange={this.handleChange("accommName")}
          type="text"
          className="form-control"
          value={accommName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Street</label>
        <input
          onChange={this.handleChange("accommStreet")}
          type="text"
          className="form-control"
          value={accommStreet}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Zip Code</label>
        <input
          onChange={this.handleChange("accommZipcode")}
          type="text"
          className="form-control"
          value={accommZipcode}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">City</label>
        <label className="form-control">{accommCity}</label>
      </div>
      <div className="form-group">
        <label className="text-muted">Country</label>
        <label className="form-control">{accommCountry}</label>
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Register
      </button>
    </form>
  );

  render() {
    const {
      name,
      email,
      password,
      image,
      countryOfOrigin,
      accommName,
      accommStreet,
      accommZipcode,
      accommCity,
      accommCountry,
      error,
      open
    } = this.state;

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-success"
          style={{ display: open ? "" : "none" }}
        >
          New account is successfully created! Please login.
        </div>

        {this.signupForm(
          name,
          email,
          password,
          image,
          countryOfOrigin,
          accommName,
          accommStreet,
          accommZipcode,
          accommCity,
          accommCountry
        )}
      </div>
    );
  }
}

export default Signup;
