const webpack = require('webpack');
const path = require('path');

const config = {
	entry: {
		main: path.resolve(__dirname, './client/public/js/app.js'),
		libs: ['jquery', 'react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, './client/public/js'),
		publicPath: "/js/",
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", "window.jQuery": "jquery", React: 'react', ReactDOM: 'react-dom'}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "libs",
			// (the commons chunk name)

			filename: "libs.js"
		})
	]
};

module.exports = config;
