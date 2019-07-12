/*
	config for build umd module to use
* */
const path = require('path');
const base = require('./webpack.base');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Uglify = require('uglifyjs-webpack-plugin');
module.exports = (args) => {
  const plugins = [];

  if (args === 'report') {
	plugins.push(
		new BundleAnalyzerPlugin(),
	);
  }

  return merge(base, {
	mode: 'production',
	entry: {},
	output: {
	  path: path.resolve(__dirname, '../lib'),
	  filename: '[name].js',
	  publicPath: '/',
	  library: 'previewImage',
	  libraryTarget: 'umd',
	  libraryExport: 'default', // 需要暴露的模块
	  umdNamedDefine: true,
	},
	module: {},
	performance: false,
	optimization: {
	  minimize: true,
	  minimizer: [
		new Uglify({
		  uglifyOptions: {
			compress: {
			  drop_console: true,
			},
		  },
		}),
	  ],
	},
	plugins,
  });
};
