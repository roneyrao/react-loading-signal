//basic configuration for all enviroments;
const general = {
	bail: true, //exit when error;
	entry:{main: './index.js'},
	output: {
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
				}, {
					loader: 'eslint-loader',
					options: {
						emitErrors: true,
						failOnError: true //fail when error;
					}
				}]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.css$/,
				loaders:[ 
					'style-loader',
					{
						loader:'css-loader',
						options:{
							module:true,
							sourceMap:true,
							localIdentName:'[name]__[local]'
						}
					},
					{
						loader:'postcss-loader',
						options:{
							plugins: [
								require('autoprefixer'),
							],
							sourceMap:true,
						}
					},
				]
			},
			{
				test: /\.gif/,
				loader: 'url-loader',
			}
		]
	},
};
module.exports=general;
