import 'localstorage-polyfill'
import 'raf/polyfill'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

global.sessionStorage = {}
global.window = {
  addEventListener() {},
  removeEventListener() {}
}

Object.defineProperty(global, 'context', {
  get: function () {
    return global.describe
  }
})

Object.defineProperty(global, 'jestExpect', {
  get: function () {
    return global.expect
  }
})
