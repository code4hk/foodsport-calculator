var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
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
            {test: /\.js$/, loader: 'babel'}
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
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
