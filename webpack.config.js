var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');


// var configPath = './config/dev.js';
// if (process.env.NODE_ENV === 'prd') {
//   configPath = './config/prd.js';
// }
// var envConfig = require(configPath);
// console.log("using config path:"+configPath);


module.exports = {
  entry: './src/app/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        //tell webpack to use jsx-loader for all *.jsx files
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.(woff(2)?|eot|svg|ttf)$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      {test: /\.js$/, loader: 'babel'}
    ]
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'react': 'React'
  },
  resolve: {
    root: [__dirname],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [new HtmlWebpackPlugin({
    // title: 'Custom template',
    template: 'index.ejs', // Load a custom template
    // inject: 'body' // Inject all scripts into the body
  })]
  //for DEV only TODO another config for PRD
  // devtool:"eval"
}
