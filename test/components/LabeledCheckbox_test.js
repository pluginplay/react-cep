import { withTheme, expect } from '../setup'
import React from 'react'
import LabeledCheckbox from '../../src/components/LabeledCheckbox'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { getDefaultTheme } from '../../src/lib/theme'

import Checkbox from '../../src/components/Checkbox'

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<LabeledCheckbox checked={false} label={'Check me baby'} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('forwards props', () => {
  const wrapper = shallow(<LabeledCheckbox theme={getDefaultTheme()} foo={'bar'} />).dive()
  expect(wrapper.find(Checkbox).first()).to.have.prop('foo').equal('bar')
  expect(wrapper.find(Checkbox).first()).to.not.have.prop('className')
})
