import styled, { keyframes } from 'styled-components'

const leftToRight = keyframes`
  from {
    left: -100px;
  }
  to {
    left: 100%;
  }
`

export default styled.div`
  background: ${props => props.isComplete ? props.theme.colors.green : props.theme.ae.systemHighlightColor};
  border-radius: 5px;
  max-width: 100%;
  height: 6px;
  width: ${props => props.percentage}%;
  transition: width 0.5s ease-in-out, background 0.5s linear;
  position: relative;
  overflow: hidden;
  &:before {
    display: block;
    content: ' ';
    background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0) 100%);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100px;
    animation: ${leftToRight} 2s ease-in-out infinite;    
  }
`
