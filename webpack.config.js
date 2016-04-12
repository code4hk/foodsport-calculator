var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');


// var configPath = './config/dev.js';
// if (process.env.NODE_ENV === 'prd') {
//   configPath = './config/prd.js';
// }
// var envConfig = require(configPath);

var SpritesmithPlugin = require('webpack-spritesmith');

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
      // {
      //   //tell webpack to use jsx-loader for all *.jsx files
      //   test: /\.jsx$/,
      //   loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      // },
      {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel',
  query: {
    presets: ['es2015','react']
    // plugins: ['transform-runtime']
  }
},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.(woff(2)?|eot|svg|ttf)$/, loaders: [
        "url-loader?limit=100000"
      ] },
      { test: /\.jpg$/, loader: "file-loader" }
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
    title: 'FoodSport',
    template: 'index.ejs', // Load a custom template
    // inject: 'body' // Inject all scripts into the body
  }),
  new SpritesmithPlugin({
    src: {
      cwd: path.resolve(__dirname, 'img/avatar'),
      glob: '*.png'
    },
    target: {
      image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
      css: [[path.resolve(__dirname, 'src/spritesmith-generated/sprite.css'),{
        format: 'css'
      }]
    ]
  },
  apiOptions: {
    cssImageRef: "sprite.png"
  }
})
]
//for DEV only TODO another config for PRD
// devtool:"eval"
}
