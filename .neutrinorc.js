module.exports = {
  options: {
    output: '.'
  },
  use: [
    '@neutrinojs/standardjs',
    ['@neutrinojs/react-components', {
      minify: {
        babel: false
      },
      targets: {
        browsers: ['chrome 27']
      }
    }],
    (neutrino) => {
      neutrino.config.module.rule('compile').use('babel').tap(options => {
        const decoratorsPlugin = require.resolve('babel-plugin-transform-decorators-legacy')
        const classPropertiesPlugin = require.resolve('babel-plugin-transform-class-properties')
        options.plugins.unshift(decoratorsPlugin, classPropertiesPlugin)

        return options
      })
    },
    ['@neutrinojs/jest', {
      setupFiles: [
        '<rootDir>/test/jest_setup.js'
      ],
      setupTestFrameworkScriptFile: '<rootDir>/test/jest_framework_setup.js'
    }]
  ]
};
