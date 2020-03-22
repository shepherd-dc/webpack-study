const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  // context: path.resolve(__dirname, '../'), // 默认当前工作目录 process.cwd()
  entry: {
    main: path.resolve(__dirname, './src/index.js')
    // list: path.resolve(__dirname, './src/list.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: path.resolve(__dirname, './public'),
    filename: 'main.js',
    // filename: '[name].js',
    // library: '[name]', // '[name]'
    library: 'myLib',
    libraryTarget: 'umd',
    libraryExport: 'default' // 打包后全局变量不需要.default才能拿到
  },
  mode: 'development',
  // target: 'web', // 默认 web
  devtool: 'cheap-module-eval-source-map', // source-map
  // watch: true,
  resolve: {
    // 帮助 webpack解析扩展名（文件后缀）的配置，默认值：['.wasm', '.mjs', '.js', '.json']
    // 所以引入js和json文件可以不写拓展名
    extensions: ['.js', '.json', '.vue', '.less', '.css'],
    // 别名
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
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
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: eslintFriendlyFormatter // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/, // 条件匹配
        use: [ // 应用规则
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env'
                  // {
                  //   useBuiltIns: 'usage',
                  //   corejs: 3
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
          // amd: false, // 禁用 AMD
          // commonjs: false, // 禁用 CommonJS
          // system: false, // 禁用 SystemJS
          // harmony: false, // 禁用 ES6 import/export
          // requireInclude: false, // 禁用 require.include
          // requireEnsure: false, // 禁用 require.ensure
          // requireContext: false, // 禁用 require.context
          // browserify: false, // 禁用 browserify
          // requireJs: false // 禁用 requirejs
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
            // 通过 plugins 选项
              plugins: [autoprefixer()]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2 // 0 => 默认，没有 loader; 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              // 通过 plugins 选项
              plugins: [autoprefixer()]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: { // 这里的options选项参数可以定义多大的图片转换为base64
            limit: 5 * 1024, // 表示小于5kb的图片转为base64,大于5kb的是路径
            outputPath: 'images' // 定义输出的图片文件夹
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // 小于 10kB(10240字节）的内联文件
          limit: 10 * 1024,
          // 移除 url 中的引号
          // (在大多数情况下它们都不是必要的)
          noquotes: true
        }
      },
      {
        // 文件解析
        test: /\.(ico|eot|woff|ttf|woff2|appcache|mp4|pdf)(\?|$)/,
        loader: 'file-loader',
        query: {
          // 这么多文件，ext不同，所以需要使用[ext]
          name: '@assets/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    port: 9000,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, './public', 'index.html'), // 模板路径
      inject: 'head', // 自动注入js位置, 默认true('body')
      favicon: path.join(__dirname, './public', 'favicon.ico') // favicon图标
    }),
    // 添加热替换 HMR plugin
    new webpack.HotModuleReplacementPlugin()
  ]
}
