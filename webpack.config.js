var path = require('path');
// import combineLoaders from ('combineLoaders')
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var qs = require('qs');

// function combineLoaders(loaders) {
//   return loaders
//     .map(function(loaderEntry) {
//       if (typeof loaderEntry === 'string') {
//         return loaderEntry;
//       }

//       var query = qs.stringify(loaderEntry.options || loaderEntry.query, {
//         arrayFormat: 'brackets',
//         encode: false,
//       });

//       if (query) {
//         query = '?' + query;
//       }

//       return loaderEntry.loader + query;
//     })
//     .join('!');
// }


module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  mode: "development",
  // plugins: [
  //   new ExtractTextPlugin('styles.css')
  // ],
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        exclude: /node_modules/,      
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'
      }

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};