import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { ChipSet, Chip } from "@material/react-chips";
import "@material/react-chips/dist/chips.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

import "./OfferFood.css";
const axios = require("axios");

class OfferFood extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      ingredients: "",
      chips: [{ label: "Enter an ingredient", id: "1" }],
      cuisine: "",
      price: "",
      image: "",
      counter: 0,
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

  handleKeyDown = e => {
    const label = e.target.value;
    if (!!label && e.key === "Enter") {
      const id = label.replace(/\s/g, "");
      const chips = [...this.state.chips];
      if (this.state.counter === 0) {
        chips.pop();
      }
      chips.push({ label, id });
      this.setState({ chips: chips });
      e.target.value = "";
      var obj = label;
      if (!this.state.ingredients.includes(obj)) {
        this.setState({ ingredients: this.state.ingredients + obj + " " });
      }

      this.setState({ counter: 1 });
    }
  };

  clickSubmit = event => {
    event.preventDefault();
    var sellerId = JSON.parse(localStorage.getItem("jwt")).user._id;

    const { name, ingredients, chips, cuisine, price, image } = this.state;

    const item = {
      name: name,
      ingredients: ingredients,
      chips: chips,
      cuisine: cuisine,
      price: price,
      image: image
    };
    console.log(item);
    var self = this;

    var bodyFormData = new FormData();
    bodyFormData.set("sellerId", sellerId);
    bodyFormData.set("name", this.state.name);
    bodyFormData.set("ingredients", this.state.ingredients);
    bodyFormData.set("cuisine", this.state.cuisine);
    bodyFormData.set("price", this.state.price);
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
          chips: [{ label: "Enter an ingredient", id: "1" }],
          cuisine: "",
          price: "",
          image: null,
          counter: 0,
          error: "",
          open: false
        });
        if ((response.state = 201)) {
          self.setState({ open: true });
        }
      })
      .catch(function(response) {
        //handle error
        if ((response.state = 500)) {
          self.setState({
            error: "An error occured during item creation. Please try again."
          });
        }
      });
  };

  itemForm = (name, ingredients, cuisine, price, status, image) => (
    <form onKeyPress={this.onKeyPress}>
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
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onKeyDown={this.handleKeyDown}
          />
          <ChipSet updateChips={chips => this.setState({ chips: chips })}>
            {this.state.chips.map(chip => (
              <Chip
                id={chip.id}
                key={Math.random()}
                label={chip.label}
                trailingIcon={<FontAwesomeIcon icon={faBackspace} />}
              />
            ))}
          </ChipSet>
        </div>
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

      <div className="form-group fileInput">
        <label className="text-muted">Image</label>
        <input
          id="image"
          onChange={this.handleChange("image")}
          type="File"
          className="form-control"
        />
      </div>
      <div className="text-center">
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Offer Food
        </button>
      </div>
    </form>
  );
  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }
  render() {
    if (isAuthenticated() === false) {
      return <Redirect to="/login" />;
    }

    const { name, chips, cuisine, price, image, error, open } = this.state;

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

        {this.itemForm(name, chips, cuisine, price, image)}
      </div>
    );
  }
}

export default OfferFood;
