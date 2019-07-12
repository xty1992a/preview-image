/**
 * Created by TY-xie on 2018/3/26.
 */
const path = require('path');
const baseConfig = {
  resolve: {
	extensions: ['.js', '.ts', '.tsx'],
	alias: {
	  '@': path.resolve(__dirname, '../src'),
	},
  },
  output: {
	path: path.resolve(__dirname, '../lib'),
	filename: '[name]/index.js',
	publicPath: './',
  },
  module: {
	rules: [
	  {
		test: /\.tsx?$/,
		use: ['babel-loader', 'ts-loader'],
		exclude: /node_modules/,
	  },
	  {
		test: /(\.jsx|\.js)$/,
		use: {
		  loader: 'babel-loader',
		},
		exclude: /(node_modules)/,
	  },
	  {
		test: /(\.css)$/,
		use: [
		  {loader: 'style-loader'},
		  {loader: 'css-loader'},
		],
	  },
	  {test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url-loader'}
	],
  },
  plugins: [],
};

module.exports = baseConfig;
