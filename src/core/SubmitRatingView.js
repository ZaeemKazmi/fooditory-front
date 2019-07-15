import React from 'react';
import Styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import RatingStars from './RatingStars';
import RoundButton from './RoundButton';

const axios = require("axios");


class PlainSubmitRatingView extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.ratingStars = React.createRef();

    this.state = {
      httpFailed: false
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let postData = {
      stars: this.ratingStars.current.state.activeStarsValue
    };

    for (let name of formData.keys()) {
      const inputValue = formData.get(name);
      postData[name] = inputValue;
    }

    axios
      .post("http://localhost:8080/review", postData)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.props.history.push(`/users/${this.props.username}`);
          this.setState({httpFailed: false});
        }
        else {
          this.setState({httpFailed: true});
        }
      })
      .catch(err => {
        console.log("error", err);
        alert("Unexpected error occured");
      });

    // fetch("http://localhost:8080/review", {
    //   method: 'POST',
    //   body: JSON.stringify(postData)
    // })
    // .then((resp) => {
    //   if (resp.status >= 200 && resp.status < 300) {
    //     this.props.history.push(`/users/${this.props.username}`);
    //     this.setState({httpFailed: false});
    //   }
    //   else {
    //     this.setState({httpFailed: true});
    //   }
    // })
    // .catch((e) => {
    //   console.log("error", e);
    //   alert("Unexpected error occured");
    // });
  }

  render() {
    return (
      <div className={this.props.className}>
        <h4>Overall rating</h4>
        <RatingStars totalStars="5" stars="3" ref={this.ratingStars}/>

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-field">
            <label>Headline</label><br/>
            <input type="text" name="headline" required/>
          </div>
          <div className="form-field">
            <label>Write your review</label><br/>
            <textarea rows="5" cols="50" name="review" required></textarea>
          </div>
          <RoundButton type="submit" id="submit">submit</RoundButton>
          <RoundButton type="button" id="cancel" onClick={() => this.props.history.push(`/users/${this.props.username}`) }>cancel</RoundButton>
        </form>
        {this.state.httpFailed === true ? 
          <h3 className="error">An error occured. Please, try again.</h3> : null
        }
      </div>
    );
  }
}

const SubmitRatingView = Styled(PlainSubmitRatingView)`
  background-color: white;
  color: #858585;
  margin-right: 1rem;
  padding: 1rem;
  flex: 1;

  h4 {
    margin-bottom: 0.1em;
  }

  #submit {
    background-color: #21B4C6;
    border-color: #21B4C6;
    margin-right: 1em;
  }

  #cancel {
    background-color: #FFC100;
    border-color: #FFC100;   
  }

  input {
    line-height: 1.5em;
  }

  textarea {
    resize: none;
  }

  .form-field {
    margin-top: 1em;
  }

  .error {
    color: red;
  }

  ${RoundButton} {
    margin-top: 1em;
  }

  ${RatingStars} {
    font-size: 2em;
  }
`;
export default withRouter(SubmitRatingView);
