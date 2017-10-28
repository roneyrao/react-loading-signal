//development specific configs;
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outDir= path.resolve(__dirname, 'demo_build');
let development = {
	entry:['index.js', 'core-js/set', 'core-js/map', 'raf/polyfill'], //polyfills for React16
	context: path.resolve(__dirname, 'demo'),
	devtool: 'cheap-module-source-map',
	output: {
		path: outDir,
	},
	resolve:{
		alias:{
			FlexLoading:path.resolve(__dirname, 'src/'),
		},
		symlinks:false
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
	]
};

//webpack-dev-server specific configs;
if (path.basename(require.main.filename) === 'webpack-dev-server.js') {
	development=merge(development, {
		plugins: [
			//for easy identifying recompiling;
			function() {
				this.plugin('done', function() {
					console.log(('\n[' + new Date().toLocaleString() + ']') + '______Start a new compilation______\n');
				});
			},
		],
		devServer: {
			disableHostCheck: true,
			contentBase: path.resolve(__dirname, outDir),
		}
	});
}
module.exports=development; 
