import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SuffixInput from './SuffixInput'
import IconButton from './IconButton'
import { chooseFiles } from 'cep-lib/cep'
import wait from '../../assets/icons/wait.svg'
import omit from 'lodash/omit'

class FilePathInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  _onChooseClick = () => {
    const result = chooseFiles()
    this.props.onChange(result && result[0])
  }

  _onInputChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render () {
    return (
      <SuffixInput
        className={this.props.className}
        suffix={<IconButton icon={wait} alt={'Choose file...'} onClick={this._onChooseClick} />}
        onChange={this._onInputChange}
        value={this.props.value}
        suffixPadding={'0'}
        {...omit(this.props, ['value', 'onChange'])}
      />
    )
  }
}

export default styled(FilePathInput)`
button {
  border: none;
  height: 100%;
}
`
