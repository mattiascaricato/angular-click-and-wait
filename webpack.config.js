const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env) => {
  const isDev = env === 'dev';
  const isBuild = env === 'build';

  return {
    entry: './src/index.js',
    devtool: isBuild ? '#hidden-source-maps' : '#cheap-module-inline-source-map',
    output: {
      filename: isBuild ? 'click-and-wait.min.js' : 'click-and-wait.js',
      path: path.join(process.cwd(), 'dist'),
      pathinfo: isDev,
      library: 'clickAndWait',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    resolve: {
      extensions: ['.js'],
      modules: ['node_modules'],
    },
    externals: {
      angular: 'angular',
    },
    watch: isDev,
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDev,
          presets: ['env'],
        },
      }],
    },
    plugins: [
      // Clean the scripts folder before each build
      ...(isDev ? [
        new CleanWebpackPlugin(['dist']),
      ] : []),

      // Minimize all JavaScript output of chunks
      ...(isBuild ? [
        new UglifyJSPlugin({ sourceMap: true, comments: false }),
      ] : []),
    ],
  };
};
