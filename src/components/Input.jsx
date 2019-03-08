import styled from 'styled-components'

export default styled.input`
  padding: 4px 6px;
  font-family: "${props => props.theme.ae.baseFontFamily}", "Segoe UI", "San Francisco", sans-serif;
  color: white;
  background: ${props => props.theme.background.dark};
  border: solid 1px ${props => props.theme.background.light};
  font-size: ${props => props.theme.ae.baseFontSize}pt;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  transition: background 0.1s ease-in-out, border-color 0.1s ease-in-out;
  max-width: ${props => props.small ? '40px' : 'none'};
  &:hover {
    border-color: ${props => props.theme.background.lighter};
  }
  &:focus {
    border-color: ${props => props.theme.ae.systemHighlightColor};
    background: ${props => props.theme.background.darker};
  }
  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: 320px) {
    padding: 2px 3px;
    font-size: 8pt;
  }
`
