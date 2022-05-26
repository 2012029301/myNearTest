module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/transform-runtime'],
    ['transform-class-properties'],
    [
      'babel-plugin-import',
      {
        libraryName: 'wanke-icon',
        libraryDirectory: 'lib/icons',
        camel2DashComponentName: false
      }
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'antd'
      },
      'antd'
    ]
  ]
}
