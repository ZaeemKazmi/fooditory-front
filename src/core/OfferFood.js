import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { offerFood, authenticate, isAuthenticated } from "../auth";

import "./OfferFood.css";
const axios = require("axios");

class OfferFood extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      ingredients: "",
      cuisine: "",
      price: "",
      currency: "",
      status: "",
      image: "",
      error: "",
      open: false
    };
  }

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
  };

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
      ingredients,
      cuisine,
      price,
      currency,
      status,
      image
    } = this.state;

    const item = {
      name: name,
      ingredients: ingredients,
      cuisine: cuisine,
      price: price,
      currency: currency,
      status: status,
      image: image
    };
    console.log(item);
    var self = this;

    var bodyFormData = new FormData();
    bodyFormData.set("name", this.state.name);
    bodyFormData.set("ingredients", this.state.ingredients);
    bodyFormData.set("cuisine", this.state.cuisine);
    bodyFormData.set("price", this.state.price);
    bodyFormData.set("currency", this.state.currency);
    bodyFormData.append("image", this.state.image);

    for (var key of bodyFormData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    axios({
      method: "post",
      url: "http://localhost:8080/item",
      data: bodyFormData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function(response) {
        self.setState({
          name: "",
          ingredients: "",
          cuisine: "",
          price: "",
          currency: "",
          status: "",
          image: null,
          error: "",
          open: false
        });
        console.log(response);
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  itemForm = (name, ingredients, cuisine, price, currency, status, image) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Item Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Ingredients</label>
        <input
          onChange={this.handleChange("ingredients")}
          type="text"
          className="form-control"
          value={ingredients}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Cuisine</label>
        <input
          onChange={this.handleChange("cuisine")}
          type="text"
          className="form-control"
          value={cuisine}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={this.handleChange("price")}
          type="text"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Currency</label>
        <input
          onChange={this.handleChange("currency")}
          type="text"
          className="form-control"
          value={currency}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Status</label>
        <input
          onChange={this.handleChange("status")}
          type={Boolean}
          className="form-control"
          value={status}
        />
      </div>
      <div className="form-group fileInput">
        <label className="text-muted">Image</label>
        <input
          id="image"
          onChange={this.handleChange("image")}
          type="File"
          className="form-control"
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Offer Food
      </button>
    </form>
  );

  render() {
    if (isAuthenticated() === false) {
      return <Redirect to="/login" />;
    }

    const {
      name,
      ingredients,
      cuisine,
      price,
      currency,
      status,
      image,
      error,
      open
    } = this.state;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Offer Food</h2>

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
          Item has published successfully.
        </div>

        {this.itemForm(
          name,
          ingredients,
          cuisine,
          price,
          currency,
          status,
          image
        )}
      </div>
    );
  }
}

export default OfferFood;
