import { expect } from '../setup'
import React from 'react'
import RadioButtonGroup from '../../src/components/RadioButtonGroup'
import Button from '../../src/components/Button'
import { shallow } from 'enzyme'
import { getDefaultTheme } from '../../src/lib/theme'

let wrapper, onChange
beforeEach(() => {
  onChange = jest.fn()
  wrapper = shallow(
    <RadioButtonGroup theme={getDefaultTheme()} onChange={onChange} value={'one'}>
      <Button key={'one'} className={'foo'}>Test</Button>
      <Button key={'two'}>Other Test</Button>
      <Button key={'three'}>Third Test</Button>
    </RadioButtonGroup>
  ).dive()
})

it('calls onChange when one of the buttons is clicked', () => {
  wrapper.find('.foo').first().simulate('click')
  expect(onChange.mock.calls).to.have.length(1)
  expect(onChange.mock.calls[0][0]).to.equal('one')
})

it('marks the currently selected button as active', () => {
  const foo = wrapper.find('.foo').first()
  expect(foo.prop('className')).to.equal('foo selected')
})
