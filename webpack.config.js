const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry: {
		main: './app/public/js/app.js',
		libs: ['jquery', 'react', 'react-dom', 'simplebar']

	},
	output: {
		path: path.resolve(__dirname, 'dist/public/js'),
		filename: '[name].min.js',
	},
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.(js|jsx)$/,
	// 			exclude: /node_modules/,
	// 			use: 'babel-loader'
	// 		}
	// 	]
	// },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			// {
			// 	test: /\.css$/,
			// 	include: /node_modules/,
			//   loader: ExtractTextPlugin.extract('style', 'css')
			// }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
				name: "libs",
				// (the commons chunk name)

				filename: "[name].min.js"
			}),
		// new ExtractTextPlugin('[name].css', {
    //         allChunks: true
    //     }),
	]
};

module.exports = config;
