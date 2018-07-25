import { expect, withTheme } from '../setup'
import renderer from 'react-test-renderer'
import MonospaceContent from '../../src/components/MonospaceContent'
import { FlexItem } from 'styled-flex-component'
import { mount } from 'enzyme'

it('renders correctly', () => {
  const tree = renderer
    .create(withTheme(<MonospaceContent>test text</MonospaceContent>))
    .toJSON()
  jestExpect(tree).toMatchSnapshot()
})

it('forwards properties to FlexItem', () => {
  const wrapper = mount(withTheme(<MonospaceContent grow={1}>test text</MonospaceContent>))
  const flexItem = wrapper.find(FlexItem).first()
  expect(flexItem).to.have.prop('grow').equal(1)
  expect(flexItem).to.have.text('test text')
  expect(flexItem).to.have.prop('onClick')
})
