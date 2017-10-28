//production specific configs;
const path = require('path');
const production = {
	entry:'index.js',
	context: path.resolve(__dirname, 'src'),
	devtool: 'source-map',
	output: {
		path:path.resolve(__dirname, 'bundle'),
		library:'FlexLoading',
		libraryTarget:'umd'
	},
	externals:{
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		}
	},
	plugins: []
};

module.exports = production;
