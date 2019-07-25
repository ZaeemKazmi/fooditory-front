import React from 'react';
import Styled from 'styled-components';

import RatingStars from './RatingStars';

const axios = require('axios');

class PlainReview extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      buyer: { stars: 0 }
    }
  }
  componentDidMount() {
    axios.get(`http://127.0.0.1:8080/user/${this.props.userId}`)
      .then(
        (result) => {
          this.setState({
            buyer: result.data
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  render() {
    let reviewDate = "";
    if (this.state.buyer.createdAt) {
      reviewDate = new Date(this.state.buyer.createdAt);
      reviewDate = reviewDate.getDate() + "-" + (reviewDate.getMonth()+1) + "-" + reviewDate.getFullYear();
    }

    return (
      <div className={this.props.className}>
        <div className="user-picture-name">
          <div id="profile-image" style={{backgroundImage: `url(http://localhost:8080/users/${this.props.userId}/avatar)`}}/>
          <div id="profile-name">
            {this.state.buyer.name}
          </div>
        </div>

        <div>
          <div className="review-title">
            {this.props.title}
          </div>
          <RatingStars totalStars="5" stars={this.state.buyer.stars} static/>
          <div className="review-date">{reviewDate}</div>
          <div className="review-body">
            {this.props.comment}
          </div>
        </div>
      </div>
    );
  }
}

const Review = Styled(PlainReview)`
  display: flex;
  flex-direction: row;
  padding-bottom: 2em;
  color: black;

  .user-picture-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 1em;
    width: 6em;
  }

  #profile-image {
    background-size: cover;
    background-repeat: no-repeat;
    height: 5em;
    width: 5em;
    border: solid #3D67E9 3px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    vertical-align: middle;
  }

  #profile-name {
    text-align: center;
  }

  .user-picture-name > div {
  }

  .review-title {
    font-weight: bold;
  }

  ${RatingStars} {
    font-size: 1em;
  }

  .review-date {
    font-style: italic;
    font-size: 0.7em;
  }

  .review-body {
    padding-top: 1em;
  }
`;
export default Review;