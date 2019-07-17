import React from 'react';
import Styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import RatingStars from './RatingStars.js';
import RoundButton from './RoundButton';

const axios = require('axios');

class PlainProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      accommodation: {}
    };
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8080/user/${this.props.user_id}`)
      .then(
        (result) => {
          this.setState({
            user: result.data,
            accommodation: result.data.accommodation
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  render() {
    return (
      <div className={this.props.className}>
        <img id="profile-image" alt="" style={{backgroundImage: `url(http://localhost:8080/users/${this.props.user_id}/avatar)`}}/>
        <span id="profile-name">
          {this.state.user.name}
        </span>

        <RatingStars totalStars="5" stars="2" static/>

        <span id="reviews">
          1 reviews
        </span>

        <div id="message-review-buttons">
        {
          this.state.user.allowReview ?
          (<RoundButton id="review" onClick={() => this.props.history.push(`${this.state.user._id}/review`)}>review</RoundButton>)
          :
          ('')
        }
        </div>

        <div className="text-center">
          Lives in: {this.state.accommodation.name}<br/>
          From: {this.state.user.countryOfOrigin}
        </div>
      </div>
    );
  }
}

const ProfileView = Styled(PlainProfileView)`
  background-color: white;
  padding: 2em;
  text-align: center;
  align-self: start;

  #profile-image {
    background-size: cover;
    background-repeat: no-repeat;
    height: 10em;
    width: 10em;
    border: solid #3D67E9 7px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    margin-top: 1em;
    vertical-align: middle;
  }

  #profile-name {
    font-weight: bold;
    font-size: 1.2em;
  }

  #message {
    background-color: #21B4C6;
    border-color: #21B4C6;
  }

  #review {
    background-color: white;
    color: #21B4C6;
    border: solid 2px #21B4C6; 
  }
`;
export default withRouter(ProfileView);
