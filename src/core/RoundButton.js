import Styled from 'styled-components';

const RoundButton = Styled.button`
  border-radius: 20px;
  color: white;
  font-weight: bold;
  padding: 0.6em 1em;
  box-shadow: -2px 2px 5px 0px rgba(0,0,0,0.50);
  border: none;

  :hover {
    cursor: pointer;
    opacity: 0.85;
  }

  :active {
    box-shadow: -1px 1px 5px 0px rgba(0,0,0,0.50);
  }

  :focus {
    outline: 0;
  }
`;
export default RoundButton;