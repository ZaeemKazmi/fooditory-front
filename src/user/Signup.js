import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

const axios = require("axios");

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      image: "",
      countryOfOrigin: "",
      accommName: "Chiemgaustraße",
      accommStreet: "Traunsteiner Straße 1-13",
      accommZipcode: "81549",
      accommCity: "Munich",
      accommCountry: "Germany",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ open: false });
    this.setState({ [name]: event.target.value });

    if (name === "image") {
      this.setState({ [name]: event.target.files[0] });
    }
  };
  setAccomDetails = event => {
    if (event.target.value === "Chiemgaustraße") {
      this.setState({ accommName: "Chiemgaustraße" });
      this.setState({ accommStreet: "Traunsteiner Straße 1-13" });
      this.setState({ accommZipcode: "81549" });
      this.setState({ accommCity: "Munich" });
      this.setState({ accommCountry: "Germany" });
    }
    if (event.target.value === "Heiglhofstraße") {
      this.setState({ accommName: "Heiglhofstraße" });
      this.setState({ accommStreet: "Heiglhofstraße 64, 65" });
      this.setState({ accommZipcode: "81377" });
      this.setState({ accommCity: "Munich" });
      this.setState({ accommCountry: "Germany" });
    }
    if (event.target.value === "Stiftsbogen") {
      this.setState({ accommName: "Stiftsbogen" });
      this.setState({ accommStreet: "Schröfelhofstraße 4-26a" });
      this.setState({ accommZipcode: "81375" });
      this.setState({ accommCity: "Munich" });
      this.setState({ accommCountry: "Germany" });
    }
  };

  validate(name, email, password, countryOfOrigin, image) {
    const errors = [];

    if (name.length === 0) {
      errors.push("Name can't be empty");
    }
    if (name.length < 3) {
      errors.push("Name should be at least 3 characters");
    }
    if (!emailRegex.test(email)) {
      errors.push("Email is not valid");
    }
    if (password.length < 7) {
      errors.push("Password should be at least 7 characters long");
    }
    if (countryOfOrigin.length === 0) {
      errors.push("Country Of Origin can't be empty");
    }
    if (image.length === 0) {
      errors.push("Image can't be empty");
    }

    return errors;
  }

  clickSubmit = event => {
    event.preventDefault();

    const errors = this.validate(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.countryOfOrigin,
      this.state.image
    );
    if (errors.length === 0) {
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
      // console.log(user);
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

      /* for (var key of bodyFormData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }*/
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
            error: "",
            open: false
          });
          //console.log(response);
          self.setState({ open: true });
        })
        .catch(err => {
          var errmsg = err.response.data.error;
          if (errmsg !== undefined) {
            if (JSON.stringify(err.response.data.error).includes("E11000")) {
              this.setState({ error: "Email already exist!" });
            }
          } else {
            self.setState({ error: "Error" });
          }
        });
    } else {
      this.setState({ error: errors[0] });
    }
  };

  signupForm = (name, email, password, image, countryOfOrigin) => (
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
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Upload</span>
          </div>
          <input
            key={name}
            id="image"
            onChange={this.handleChange("image")}
            type="File"
            className="form-control"
          />
        </div>
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

      <div className="form-group">
        <label className="text-muted">Accommodation</label>
        <select
          className="selectpicker form-control"
          value={this.state.value}
          onChange={this.setAccomDetails}
        >
          <option value="Chiemgaustraße">Chiemgaustraße</option>
          <option value="Heiglhofstraße">Heiglhofstraße</option>
          <option value="Stiftsbogen">Stiftsbogen</option>
        </select>
      </div>
      <div className="text-center">
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Register
        </button>
      </div>
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
