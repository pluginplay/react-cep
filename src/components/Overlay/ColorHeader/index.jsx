import Flex from 'styled-flex-component'

export default Flex.extend`
  background: ${props => props.theme.colors[props.color]};
  color: white;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  span {
    margin: 0 auto;
  }
  a {
    margin: 0 3px 0 auto;
    font-size: 14px;
    font-weight: normal;
    color: white;
    text-decoration: none;
  }
`
