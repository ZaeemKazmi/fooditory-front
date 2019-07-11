import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class TestPage extends Component {
  constructor() {
    super()
    this.state = {
      itemId: "",
      itemName: "",
      sellerId: "",
      sellerName: ""
    }
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  }

  sendMessageToSeller = props => {
    const { itemId, itemName, sellerId, sellerName } = this.state;

    const data = {
      itemId,
      itemName,
      sellerId,
      sellerName
    };
    console.log(data);

    this.props.history.push({
        pathname: "/chat",
        newChat: data // your data array of objects
      });
  }

  render() {

    return (
      <div>
        <TextField
          label="Item Id"
          required
          value={this.state.itemId}
          onChange={this.handleChange("itemId")}
        /> <br />
        <TextField
          label="Item Name"
          required
          value={this.state.itemName}
          onChange={this.handleChange("itemName")}
        /> <br />
        <TextField
          label="Seller Id"
          required
          value={this.state.sellerId}
          onChange={this.handleChange("sellerId")}
        /><br />
        <TextField
          label="Seller Name"
          required
          value={this.state.sellerName}
          onChange={this.handleChange("sellerName")}
        /> <br />
        <Button variant="contained" color="primary" onClick={this.sendMessageToSeller}>
          Send Message To Seller
      </Button>
      </div>
    )
  }

}
export default TestPage;