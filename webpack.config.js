const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
	src: path.join(__dirname, '/src'),
	dist: path.join(__dirname, '/dist')
};

module.exports = {
	mode: 'development',

	entry: {
		page: './src/script.ts',
	},

	output: {
		filename: "script.js",
		path: `${paths.dist}`
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({ filename:'style.css' }),
		new HtmlWebpackPlugin({
			template: `${paths.src}/page.html`,
			filename: `./index.html`
		})
	],

	module: {
		rules: [{
			test: /\.(ts|tsx)$/,
			loader: 'ts-loader',
			include: [ paths.src ],
			exclude: [/node_modules/]
		}, {
			test: /.(scss|css)$/,

			use: [{
				loader: MiniCssExtractPlugin.loader
			}, {
				loader: "css-loader",
				options: {
					sourceMap: true
				}
				}, {
				loader: "sass-loader",
				options: {
					sourceMap: true
				}
			}]
		}]
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
		plugins: [ new TsconfigPathsPlugin() ]
	},

	devServer: {
		contentBase: paths.dist,
		stats: {
			children: false, // Hide children information
			maxModules: 0 // Set the maximum number of modules to be shown
		},
		compress: true,
		port: 2797,
		hot: true
	},

	optimization: {
		minimizer: [ new TerserPlugin() ],

		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	}
};