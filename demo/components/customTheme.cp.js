
import React, {Component as Comp} from 'react';
import PropTypes from 'prop-types';
import {LocalLoading} from 'FlexLoading';
 
class TxtTheme extends Comp{
	static Symbols=['--','\\','|','/'];
	Symbols=this.constructor.Symbols;
	symLen=this.Symbols.length;
	symIndex=0;
	state={symbol:''};
	componentDidMount(){
		this.timer=window.setInterval(()=>{
			this.symIndex=(this.symIndex+1)%this.symIndex;
			this.setState({symbol:this.Symbols[this.symIndex]});
		}, 500);
	}
	componentWillUnmount(){
		window.clearInterval(this.timer);
	}
	render(){
		return (
			<div>{this.state.symbol+' Loading'}</div>
		)
	}
}
export default function CustomTheme(props){
	return (
		<LocalLoading {...props} theme={TxtTheme} />
	)
}
CustomTheme.propTypes={
	active:PropTypes.bool,
	theme:PropTypes.func,
	button:PropTypes.node
}
