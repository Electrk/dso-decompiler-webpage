const path    = require ('path');
const webpack = require ('webpack');


module.exports =
{
	entry: './main.js',

	output:
	{
		filename: 'bundle.js',
		path: path.join (__dirname + '/dist'),
	},

	mode: 'production',

	module:
	{
		rules:
		[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options:
				{
					presets: ['@babel/preset-env'],
				}
			},
		]
	}
};
