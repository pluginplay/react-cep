import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class RadioButtonGroup extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className={this.props.className} style={this.props.style}>
        {React.Children.map(this.props.children, (child) => {
          if (!child.key) {
            console.warn('Button is missing key in RadioButtonGroup')
            return null
          }
          const onClick = this.props.onChange.bind(null, child.key)
          let className = ''
          if (this.props.value === child.key) {
            className = child.props.className ? child.props.className + ' selected' : 'selected'
          }
          return React.cloneElement(child, { onClick, className })
        }).filter(Boolean)}
      </div>
    )
  }
}

export default styled(RadioButtonGroup)`
  border: solid 1px ${props => props.theme.background.light};
  background: ${props => props.theme.background.dark};
  display: flex;
  > button {
    margin: 0;
    min-width: 0;
    border: none;
    &.selected {
      background: ${props => props.theme.ae.systemHighlightColor} !important;
    }
  }
`
