const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
	entry: {
		main: './app/public/js/app.js',
		libs: ['jquery', 'react', 'react-dom']

	},
	output: {
		path: path.resolve(__dirname, 'dist/public/js'),
		filename: '[name].min.js',
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
		new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", "window.jQuery": "jquery", React: 'react', ReactDOM: 'react-dom'}),
		new webpack.optimize.CommonsChunkPlugin({
				name: "libs",
				// (the commons chunk name)

				filename: "[name].min.js"
			}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};

module.exports = config;
