import styled from 'styled-components'

export default styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isSelected ? props.theme.ae.panelBackgroundColor : props.theme.background.dark};
  cursor: pointer;
  transition: background 0.1s linear;
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  img {
    width: 16px;
    transition: transform 0.25s ease-in-out;
    transform: scale(1);
    margin: 0 auto;
  }
  &:hover {
    background: ${props => props.theme.ae.panelBackgroundColor};
  }
  &:active {
    padding: 0;
    img { transform: scale(0.9); }
  }
  @media (max-width: 320px) {
    height: 20px;
    img { width: 10px; }
  }
`
