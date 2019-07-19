import React from 'react';
import Styled from 'styled-components';

import RoundButton from './RoundButton';


class PlainFoodOffer extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <img src={`http://localhost:8080/${this.props.image}`} alt=""/>
        <div className="offer-details">
          <div>
            <b>{this.props.name}</b><br/>
            Price: {this.props.price}{this.props.currency}<br/>
            Cuisine: {this.props.cuisine}<br/>
            Ingredients: {this.props.ingredients}<br/>
          </div>
          <RoundButton id="message">message</RoundButton>
        </div>
      </div>
    );
  }
}

const FoodOffer = Styled(PlainFoodOffer)`
  display: flex;
  flex-direction: row;
  padding-bottom: 2em;

  > img {
    max-width: 20em;
    max-height: 20em;
    margin-right: 2em;
    object-fit: contain;
    align-self: baseline;
    box-shadow: -2px 2px 5px 0px rgba(0,0,0,0.50);
  }

  .offer-details {
    line-height: 2em;
    font-weight: bold;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #message {
    background-color: #21B4C6;
    border-color: #21B4C6;
  }
`;
export default FoodOffer;