import React from 'react';
import Styled from 'styled-components';

class PlainRatingStars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStarsValue: Number(props.stars),  // Keeps how many stars are selected right now
      clickStarsValue: Number(props.stars)                      // Keeps how many stars are selected when there is a 'click' event
    };
  }

  starMouseEnter(event) {
    let starValue = Number(event.target.getAttribute('value'));
    this.setState({activeStarsValue: starValue});
  }

  starMouseLeave(event) {
    this.setState({activeStarsValue: this.state.clickStarsValue});
  }

  starMouseClick(event) {
    let starValue = Number(event.target.getAttribute('value'));
    this.setState({activeStarsValue: starValue, clickStarsValue: starValue});
  }

  render() {
    const stars = [];

    for (let i = 1; i <= this.props.totalStars; i++) {
      let starProps = {
        className: "star" + (this.state.activeStarsValue >= i ? ' selected' : ''),
        value: i
      };

      if(!this.props.static) {
        starProps['className'] += " selectable";
        starProps['onMouseEnter'] = this.starMouseEnter.bind(this);
        starProps['onMouseLeave'] = this.starMouseLeave.bind(this);
        starProps['onClick'] = this.starMouseClick.bind(this);
      }

      stars.push(<span {...starProps} key={i}>★</span>);
    }

    return (
      <div className={this.props.className} stars={this.state.activeStarsValue}>
        {stars}
      </div>
    );
  }
}

const RatingStars = Styled(PlainRatingStars)`
  color: white;
  -webkit-text-stroke: 1px #FFC100;

  .star.selected {
    color: #FFC100;
  }

  .star.selectable:hover {
    cursor: pointer;
  }
`;
export default RatingStars;
