import styled from 'styled-components'

export default styled.button`
  padding: 4px 8px;
  margin: 10px auto;
  min-width: 100px;
  font-family: "${props => props.theme.ae.baseFontFamily}", "Segoe UI", "San Francisco", sans-serif;
  color: white;
  background: ${props => props.theme.background.dark};
  border: solid 1px ${props => props.theme.background.light};
  font-size: ${props => props.theme.ae.baseFontSize}pt;
  outline: none;
  box-sizing: border-box;
  transition: background 0.1s ease-in-out, border-color 0.1s ease-in-out, transform 0.1s ease-in-out;
  transform: scale(1);
  cursor: pointer;
  display: inline-block;
  &:hover, &:focus, &:active {
    border-color: ${props => props.theme.ae.systemHighlightColor};
    background: ${props => props.theme.background.darker};
  }
  &:active { 
    transform: scale(0.95);
    background: ${props => props.theme.ae.panelBackgroundColor};
  }
`
