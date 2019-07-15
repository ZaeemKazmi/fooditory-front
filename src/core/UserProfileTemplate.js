import React from 'react';
import Styled from 'styled-components';

import ProfileView from './ProfileView';


const Row = Styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  margin-top: 1em;
`;

class PlainUserProfileTemplate extends React.Component {
  render() {
    const ContentComponent = this.props.contentComponent;

    return (
      <main className={this.props.className}>
        <Row>
          <div className="main-content">
            <ContentComponent username={this.props.match.params.user_id}/>
          </div>
          <ProfileView user_id={this.props.match.params.user_id}/>
        </Row>
      </main>
    );
  }
}

const UserProfileTemplate = Styled(PlainUserProfileTemplate)`
  display: flex;
  height: 100%;
  justify-content: center;
  background-color: red;

  .main-content {
    background-color: white;
    color: #858585;
    margin-right: 1rem;
    padding: 1rem;
    flex: 1;
  }
`;
export default UserProfileTemplate;