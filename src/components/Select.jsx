import React from 'react'
import styled from 'styled-components'
import ReactSelect from 'react-select'
import PropTypes from 'prop-types'
import 'react-select/dist/react-select.css'

class Select extends React.Component {
  static propTypes = {
    SelectComponent: PropTypes.func.isRequired
  }

  static defaultProps = {
    SelectComponent: ReactSelect
  }

  render () {
    const { SelectComponent } = this.props
    return (
      <SelectComponent {...this.props} />
    )
  }
}

export default styled(Select)`
&.Select.Select--single {
  flex-grow: 1;
  > .Select-control, &.is-open > .Select-control {
    font-family: "${props => props.theme.ae.baseFontFamily}", "Segoe UI", "San Francisco", sans-serif;
    color: white;
    background: ${props => props.theme.background.dark};
    border: solid 1px ${props => props.theme.background.light};
    font-size: ${props => props.theme.ae.baseFontSize}pt;
    border-radius: 0;
    height: 33px;
  }
  &.is-focused > .Select-control {
    border-color: ${props => props.theme.ae.systemHighlightColor};
    background: ${props => props.theme.background.darker};
    box-shadow: none;
    .Select-value .Select-value-label { color: white !important; }
  }
  &.has-value > .Select-control .Select-value .Select-value-label { color: white; }
  &.is-open > .Select-control {
    border-color: ${props => props.theme.ae.systemHighlightColor};
    background: ${props => props.theme.background.darker};
    .Select-value .Select-value-label { color: ${props => props.theme.background.light}; }
    .Select-input input { color: white; }
  }
  &.is-open > .Select-menu-outer {
    background: ${props => props.theme.background.darker};
    border: solid 1px ${props => props.theme.ae.systemHighlightColor};
    border-top: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    .Select-option {
      background: none;
      color: white;
      &.is-selected, &.is-focused {
        background: ${props => props.theme.background.dark};
      }
    }
  }
}
`
