
const path = require('path');
const merge=require('webpack-merge');

const cfgCmm=require(`./webpack.common.js`);
let cfgEnv=require(`./webpack.${process.env.NODE_ENV}.js`);
let cfg=merge.smart(cfgCmm, cfgEnv);

if(cfg.output.path==cfg.context){
	throw new Error('output path collides with source path.');
}


if(!path.basename(require.main.filename) === 'webpack-dev-server.js'){
	require('rimraf').sync(cfg.output.path);
}
if(process.env.NODE_ENV=='production'){
	cfg=[cfg, merge.smart(cfgCmm, require('./webpack.production.min'))]
}

module.exports=cfg;
