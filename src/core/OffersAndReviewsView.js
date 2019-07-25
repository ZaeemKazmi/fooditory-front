import React from 'react';
import Styled from 'styled-components';

import FoodOffer from './FoodOffer';
import Review from './Review';

const axios = require('axios');


class PlainOffersAndReviewsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.username,
      offers: [],
      reviews: []
    }
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:8080/users/${this.state.user}/reviews`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            reviews: result.map((review, i) => (
              <Review key={i} title={review.title} comment={review.comment} userId={review.buyerId}/>
            ))
          });
        },
        (error) => {
          console.log(error)
          this.setState({
            reviews: []
          });
        }
      )

    axios.get(`http://127.0.0.1:8080/user/${this.props.username}`)
      .then(res => {
        const username = res.data.name;

        fetch(`http://127.0.0.1:8080/${this.state.user}/items`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                offers: result.map((item, i) => (
                  <FoodOffer key={i} {...item} username={username}/>
                ))
              });
            },
            (error) => {
              console.log(error)
              this.setState({
                offers: []
              });
            }
          )
      });
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="category-title">Current offers</div>
        <hr/>
        {this.state.offers.length === 0 ? "There are no current offers": this.state.offers}

        <div className="category-title">Past reviews</div>
        <hr/>
        {this.state.reviews.length === 0 ? "There are no past reviews": this.state.reviews}
      </div>
    );
  }
}

const OffersAndReviewsView = Styled(PlainOffersAndReviewsView)`
  display: flex;
  flex-direction: column;
  color: black;

  .category-title {
    font-size: 1.3em;
    color: #858585;
  }

  hr {
    width: 95%;
    border-left: 0;
  }
`;
export default OffersAndReviewsView;