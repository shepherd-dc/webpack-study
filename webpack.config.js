const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    // publicPath: 'http://cdn.example.com/assets/assets/',
    library: '[name]', // '[name]'
    libraryTarget: 'umd'
  },
  mode: 'development',
  watch: true,
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, 'src/lib')
    }
  },
  module: {
    rules: [{
      test: /\.js$/, // 条件匹配
      use: [ // 应用规则
        {
          loader: 'babel-loader'
        }
      ]
    },
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [path.resolve(__dirname, 'src')], // 指定检查的目录
      options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
      }
    }]
  },
  plugins: []
}
