const webpack = require('webpack');
const path = require('path');

const config = {
	entry: {
		main: path.resolve(__dirname, './public/js/app.js'),
		libs: ['jquery', 'react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, './public/js'),
		publicPath: "/js/",
		filename: '[name].js'
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
				// test: /\.css$/,
				// loaders: [
				// 	'style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
				// ],
				// include: '/node_modules/simplebar/'
				// loader: ExtractTextPlugin.extract('style', 'css')
			// }
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", "window.jQuery": "jquery", React: 'react', ReactDOM: 'react-dom'}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "libs",
			// (the commons chunk name)

			filename: "libs.js"
		}),
		// new ExtractTextPlugin('libs.css', {
    //         allChunks: true
    //     }),

		// new BrowserSyncPlugin(
		//   // BrowserSync options
		//   {
		//     // browse to http://localhost:3000/ during development
		//     host: 'localhost',
		//     port: 3000,
		//     // proxy the Webpack Dev Server endpoint
		//     // (which should be serving on http://localhost:3100/)
		//     // through BrowserSync
		//     proxy: 'http://localhost:3000/'
		//   },
		//   // plugin options
		//   {
		//     // prevent BrowserSync from reloading the page
		//     // and let Webpack Dev Server take care of this
		//     reload: false
		//   }
		// )
	]
};

module.exports = config;
