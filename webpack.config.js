const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let envFile = require('node-env-file');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
	if(process.env.NODE_ENV === 'development'){
		envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
	}
} catch(e) {
	console.log(e);
}

const VENDOR_LIBS = [
	"axios",
	"jquery",
	"lodash",
	"react",
	"react-dom",
	"react-redux",
	"react-router-dom",
	"redux",
	"redux-promise"
];

module.exports = {
	entry    : {
		bundle : './src/index.js',
		vendors: VENDOR_LIBS
	},
	output   : {
		path    : path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
	module   : {
		rules: [
			{
				test   : /\.jsx|js$/,
				use    : 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(css|sass|scss)$/,
				use : ExtractTextPlugin.extract({
					                                use: ['css-loader', 'sass-loader']
				                                })
			},
			{
				test: /\.(jpe?g|png|gif|mp4)$/i,
				use : [
					{
						loader : 'url-loader',
						options: { limit: 4000000 }
					},
					'image-webpack-loader'
				]
			},
			{
				test  : /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			}
		]
	},
	resolve  : {
		alias     : {
			ApplicationStyles: path.resolve(__dirname, 'src/style/app.scss')
		},
		extensions: ['.jsx', '.js', '.scss'],
		modules   : ['node_modules']
	},
	plugins  : [
		new webpack.ProvidePlugin({
			$     : 'jquery',
			jQuery: 'jquery'

		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendors', 'manifest']
		}),
		new htmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new ExtractTextPlugin({
			filename : 'dist/[name].bundle.css',
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}

		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets/images', to: path.join(__dirname, 'dist/images') }
		])
	],
	devServer: {
		historyApiFallback: true,
		contentBase       : path.join(__dirname, 'dist'),
		port              : 8088
	},
	devtool  : 'source-map'
};

