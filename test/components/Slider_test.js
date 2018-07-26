import { expect, withTheme } from '../setup'
import React from 'react'
import Slider from '../../src/components/Slider'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { getDefaultTheme } from '../../src/lib/theme'

import RCSlider from 'rc-slider/lib/Slider'

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<Slider min={0} max={100} value={10} />))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('forwards props', () => {
  const wrapper = shallow(<Slider theme={getDefaultTheme()} min={0} max={100} value={10} />).dive()
  const slider = wrapper.find(RCSlider).first()
  expect(slider).to.have.prop('min').equal(0)
  expect(slider).to.have.prop('max').equal(100)
  expect(slider).to.have.prop('value').equal(10)
  expect(slider).to.have.prop('className').equal('') // RCSlider attaches their own className by default.
})
