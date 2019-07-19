import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

const axios = require("axios");

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
var formError, nameError, emailerror, passwordError, imageError;
class Signup extends Component {
  constructor() {
    formError = "";
    nameError = "";
    emailerror = "";
    passwordError = "";
    imageError = "";
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
    switch (name) {
      case "name":
        nameError =
          event.target.value.length < 3
            ? "Display name must be at least 3 characters. "
            : "";
        break;
      case "email":
        console.log(emailRegex.test(event.target.value));
        emailerror = emailRegex.test(event.target.value)
          ? ""
          : "Invalid email address ";
        break;
      case "password":
        passwordError =
          event.target.value.length < 7
            ? "Password must be at least 7 characters. "
            : "";
        break;
      case "image":
        imageError =
          event.target.files[0] === null ? "Image cannot be empty. " : "";
        break;
      default:
        break;
    }

    this.setState({ open: false });
    this.setState({ [name]: event.target.value });

    if (name === "image") {
      this.setState({ [name]: event.target.files[0] });
    }
  };
  setAccomDetails = event => {
    console.log(event.target.value);
    if (event.target.value === "Accom1") {
      this.setState({ accommName: "Chiemgaustraße" });
      this.setState({ accommStreet: "Traunsteiner Straße 1-13" });
      this.setState({ accommZipcode: "81549" });
      this.setState({ accommCity: "Munich" });
      this.setState({ accommCountry: "Germany" });
    }
    if (event.target.value === "Accom2") {
      this.setState({ accommName: "Heiglhofstraße" });
      this.setState({ accommStreet: "Heiglhofstraße 64, 65" });
      this.setState({ accommZipcode: "81377" });
      this.setState({ accommCity: "Munich" });
      this.setState({ accommCountry: "Germany" });
    }
    if (event.target.value === "Accom3") {
      this.setState({ accommName: "Stiftsbogen" });
      this.setState({ accommStreet: "Schröfelhofstraße 4-26a" });
      this.setState({ accommZipcode: "81375" });
      this.setState({ accommCity: "Munich" });
      this.setState({ accommCountry: "Germany" });
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
        self.setState({ open: true });
      })
      .catch(err => {
        var errmsg = err.response.data.error;
        formError = nameError + emailerror + passwordError + imageError;
        console.log(formError);
        if (formError === "") {
          self.setState({ error: "Fields cannot be blank" });
          console.log(err.response.data);
          if (errmsg !== undefined) {
            if (JSON.stringify(err.response.data.error).includes("E11000")) {
              this.setState({ error: "Email already exist!" });
            }
          }
        } else {
          self.setState({ error: formError });
        }
      });
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
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Upload</span>
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

      <div class="form-group">
        <label className="text-muted">Accommodation</label>
        <select
          class="selectpicker form-control"
          value={this.state.value}
          onChange={this.setAccomDetails}
        >
          <option value="accom1">Chiemgaustraße</option>
          <option alue="accom2">Heiglhofstraße</option>
          <option alue="accom3">Stiftsbogen</option>
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
