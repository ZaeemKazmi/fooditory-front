import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { offerFood } from "../auth";
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
      status: null,
      image: null,
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ open: false });
    this.setState({ [name]: event.target.value });
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

    const offerFood = {
      name: name,
      ingredients: ingredients,
      cuisine: cuisine,
      price: price,
      currency: currency,
      status: status,
      image: image
    };
    console.log(offerFood);
    var self = this;
    axios
      .post("http://localhost:8080/offerFood", offerFood)
      .then(function(response) {
        console.log(response);

        self.setState({
          name: "",
          ingredients: "",
          cuisine: "",
          price: "",
          currency: "",
          status: null,
          image: null,
          error: "",
          open: false
        });
      })
      .catch(err => {
        console.log(err.response);
        if (!JSON.stringify(err.response.data.error).startsWith("{")) {
          this.setState({ error: err.response.data.error });
        } else {
          this.setState({
            error:
              "Multiple incorrect values, please fix for your errors and then try again!"
          });
        }
      });
  };

  offerFoodForm = (
    name,
    ingredients,
    cuisine,
    price,
    currency,
    status,
    image
  ) => (
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
      <div className="form-group">
        <label className="text-muted">Image</label>
        <input
          onChange={this.handleChange("image")}
          type={Buffer}
          className="form-control"
          value={image}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Offer Food
      </button>
    </form>
  );

  render() {
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

        {this.offerFoodForm(
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
