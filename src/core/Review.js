import React from 'react';
import Styled from 'styled-components';

import RatingStars from './RatingStars';


class PlainReview extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="user-picture-name">
          <div id="profile-image"/>
          <div id="profile-name">
            Gordon Ramsey
          </div>
        </div>

        <div>
          <div className="review-title">
            {this.props.title}
          </div>
          <RatingStars totalStars="5" stars="2" static/>
          <div className="review-date">01.06.2019</div>
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
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/6/6f/Gordon_Ramsay.jpg");
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