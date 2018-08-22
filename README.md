![][header-image]

[![CircleCI][circleci-image]][circleci-url]
[![NPM version][npm-version]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
![License][license]
![Issues][issues]

`react-cep` is a React component library for Adobe CEP (Common Extensibility Platform) plugins.

## Get Started

```sh
npm install --save react-cep
```

```jsx harmony
import { render } from 'react-dom'
import SystemContainer from 'react-cep/SystemContainer'
import SystemState from 'react-cep/SystemState'

const systemState = new SystemState()
const root = document.getElementById('root')
const load = () => render((
  <SystemContainer systemState={systemState} errorEvent={'plugin.error'} theme={{}}>
    <p>Foobar!</p>
  </SystemContainer>
), root)

load()
```

**Note:** It is not recommend to import the `react-cep` root. If you do so, it will return nothing as
the `index.js` file in the package is used for development purposes. Each component has been packaged
separately in order to allow developers to only import what they need.

## Features

- Provides a stable foundation for CEP plugin developers to build on in order to quickly release plugins.
- Includes several components, documented through the tests for now.

[header-image]: https://raw.githubusercontent.com/sammarks/art/master/react-cep/header.jpg
[circleci-image]: https://img.shields.io/circleci/project/github/sammarks/react-cep.svg
[circleci-url]: https://circleci.com/gh/sammarks/react-cep/tree/master
[npm-version]: https://img.shields.io/npm/v/react-cep.svg
[npm-downloads]: https://img.shields.io/npm/dm/react-cep.svg
[npm-url]: https://www.npmjs.com/package/react-cep
[license]: https://img.shields.io/github/license/sammarks/react-cep.svg
[issues]: https://img.shields.io/github/issues/sammarks/react-cep.svg
