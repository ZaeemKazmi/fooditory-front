import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import "@material/react-chips/dist/chips.css";
import { updateItem } from "../utils/item";

import "./OfferFood.css";
const axios = require("axios");

let loggedInUser;

class UserItem extends Component {
  constructor() {
    super();

    var self = this;
    this.state = {
      data: [],
      status: null
    };

    axios
      .get("http://localhost:8080/userItems/" + isAuthenticated().user.id)
      .then(function(response) {
        self.setState({ data: response.data });
      })
      .catch(function(response) {
        //handle error
      });
  }
  changeStatus = item => event => {
    loggedInUser = isAuthenticated();
    var status = event.target.checked;
    this.setState({ status: !event.target.checked });
    updateItem(loggedInUser.token, item.id, { status })
      .then(res => {
        console.log("Response", res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="row" style={{ marginTop: "10px", paddingLeft: "30px" }}>
        {this.state.data.map((item, index) => {
          return (
            <div
              className="card text-center"
              key={index}
              style={{
                padding: "10px"
              }}
            >
              <div className="card-body">{item.name}</div>
              <div
                className="card-body"
                style={{
                  padding: "10px"
                }}
              >
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={"http://localhost:8080/" + item.image}
                />
                <div
                  className="custom-control custom-switch"
                  style={{
                    paddingTop: "10px"
                  }}
                >
                  <input
                    type="checkbox"
                    id={index}
                    className="custom-control-input"
                    onChange={this.changeStatus(item)}
                    defaultChecked={item.status}
                  />
                  <label className="custom-control-label" htmlFor={index}>
                    Item status
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UserItem;
