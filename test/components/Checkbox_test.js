import { expect, withTheme } from '../setup'
import React from 'react'
import Checkbox from '../../src/components/Checkbox'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { getDefaultTheme } from '../../src/lib/theme'

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<Checkbox checked={false} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('forwards props', () => {
  const onChange = () => null
  const wrapper = shallow(<Checkbox theme={getDefaultTheme()} onChange={onChange} />).dive()
  expect(wrapper.find('input').first()).to.have.prop('onChange').equal(onChange)
  expect(wrapper.find('input').first()).to.not.have.prop('className')
})
