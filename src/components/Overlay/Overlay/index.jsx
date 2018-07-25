import Flex from 'styled-flex-component'

export default Flex.extend`
  transition: opacity 0.25s linear, z-index 0s linear ${props => props.visible ? '' : '0.25s'};
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.background.dark};
  z-index: ${props => props.visible ? 3 : -1};
  opacity: ${props => props.visible ? 1 : 0};
  a {
    color: white;
    text-decoration: none;
    opacity: 0.75;
    transition: opacity 0.2s linear;
    &:hover {
      opacity: 1;
    }
  }
`
