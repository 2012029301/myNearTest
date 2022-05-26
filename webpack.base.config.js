let path = require('path')

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: [
    './src/index.tsx'
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
      {
        test: /\.less/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {test: /\.scss/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {
        test: /\.(gif|png|jpg|svg|xlsx)/, loaders: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: (imgPath) => {
                let parts = imgPath.split(path.sep)
                let lastIndex = parts.length - 1
                return parts[lastIndex - 1] + '-[hash:5]-' + parts[lastIndex]
              }
            }
          }
        ]
      },
      {
        test: /\.(xml|txt|ttf)/, loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve('src'),
    },
    mainFields: ['browser', 'module', 'main']
  },
  externals: {
    d3: 'window.d3',
    egret: 'window.egret',
    react: 'React',
    "react-dom": 'ReactDOM',
    antd: 'antd'
  }
}
