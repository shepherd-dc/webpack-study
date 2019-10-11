const path = require('path')
const webpack = require('webpack')

module.exports = {
  // context: path.resolve(__dirname, '../'), // 默认当前工作目录 process.cwd()
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
    // list: path.resolve(__dirname, './src/list.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: 'http://cdn.example.com/assets/assets/',
    library: 'myLab', // '[name]'
    libraryTarget: 'umd'
  },
  mode: 'development',
  // target: 'web', // 默认 web
  devtool: 'cheap-module-eval-source-map', // source-map
  watch: true,
  resolve: {
    // 帮助 webpack解析扩展名（文件后缀）的配置，默认值：['.wasm', '.mjs', '.js', '.json']
    // 所以引入js和json文件可以不写拓展名
    extensions: ['.js', '.json', '.vue', '.less', '.css'],
    // 别名
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, 'src/lib')
    },
    // mainFields: ['browser', 'module', 'main'], // target=web对应的默认值
  },
  module: {
    // noParse控制哪些文件不解析
    noParse: /jquery|lodash/, // 使用正则表达式

    // // 使用函数，从 Webpack 3.0.0 开始支持
    // noParse: (content) => {
    //     // content 代表一个模块的文件路径
    //     // 返回 true or false
    //     return /jquery|lodash/.test(content);
    // },
    rules: [
      {
        test: /\.js$/, // 条件匹配
        use: [ // 应用规则
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  // {
                  //   useBuiltIns: 'usage'
                  // }
                ]
              ]
            }
          }
        ],
        // enforce:'post' 代表把该 loader 的执行顺序放到最后
        // enforce:'pre'，代表把该 loader 的执行顺序放到最前
        enforce: 'post',
        // parser语法层面限制解析的模块
        parser: {
          amd: false, // 禁用 AMD
          commonjs: false, // 禁用 CommonJS
          // system: false, // 禁用 SystemJS
          // harmony: false, // 禁用 ES6 import/export
          requireInclude: false, // 禁用 require.include
          requireEnsure: false, // 禁用 require.ensure
          // requireContext: false, // 禁用 require.context
          // browserify: false, // 禁用 browserify
          requireJs: false, // 禁用 requirejs
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
