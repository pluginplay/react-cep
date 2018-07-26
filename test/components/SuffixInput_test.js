import { withTheme, expect } from '../setup'
import React from 'react'
import SuffixInput from '../../src/components/SuffixInput'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { getDefaultTheme } from '../../src/lib/theme'

import Input from '../../src/components/Input'

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<SuffixInput suffix={'%'} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('forwards props', () => {
  const wrapper = shallow(<SuffixInput theme={getDefaultTheme()} foo={'bar'} suffix={'boo'} />).dive()
  expect(wrapper.find(Input).first()).to.have.prop('foo').equal('bar')
  expect(wrapper.find(Input).first()).to.not.have.prop('className')
})
