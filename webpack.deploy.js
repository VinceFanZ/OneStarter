var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var assetsPath = process.env.DEV_ENV === 'production'
	? './'
	: './';
var config = {
	cache: true,
	entry: {
		app: path.resolve(__dirname, 'src/index.js'),
		shared: [
			'react',
			'react-router',
			'react-redux',
			'redux',
			'actions',
			'reqwest'
		]
	},
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: assetsPath + 'js/app.js',
		chunkFilename: assetsPath + 'js/chunk.[id].[hash:4].js',
		//cdn host
		publicPath: ''
	},
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules',
			'src/assets'
		],
		extensions: ['', '.json', '.js', '.png']
	},
	module: {
		loaders: [{
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('css?-minimize!postcss!less')
		}, {
			test: /\.(js|jsx)?$/,
			exclude: /node_modules/,
			loaders: ['babel', 'eslint']
		}, {
			test: /\.json?$/,
			loader: 'json'
		}, {
			test: /\.(jp?g|gif|png|woff|ico)$/,
			loaders: ['url-loader?limit=8192&name=' + assetsPath + 'images/[name].[hash:4].[ext]', 'img?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}']
		}, {
			test: /\.(woff2?|otf|eot|ttf)$/i,
			loader: 'url?name=fonts/[name].[hash:4].[ext]'
		}]
	},
	imagemin: {
		gifsicle: {
			interlaced: false
		},
		jpegtran: {
			progressive: true,
			arithmetic: false
		},
		optipng: {
			optimizationLevel: 5
		},
		pngquant: {
			floyd: 0.5,
			speed: 2
		},
		svgo: {
			plugins: [{
				removeTitle: true
			}, {
				convertPathData: false
			}]
		}
	},
	postcss: function() {
		return [
			require('precss'),
			require('autoprefixer')
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.tpl.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new StatsPlugin('webpack.stats.json', {
			source: false,
			modules: true
		}),
		new ExtractTextPlugin(assetsPath + 'css/app.css'),
		new webpack.optimize.CommonsChunkPlugin('shared', assetsPath + 'js/shared.js'),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			cache: false,
			compressor: {
				warnings: false,
				screw_ie8: false
			},
			output: {
				comments: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			moveToParents: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.DEV_ENV': JSON.stringify(process.env.DEV_ENV)
		})
	]
};

module.exports = config;
