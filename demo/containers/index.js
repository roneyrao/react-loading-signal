import React,{Component as Comp} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
 
import {load, stop} from '../actions';
 
 
class Panel extends Comp{
	state={timeout:1, isInfinity:true}
 
 
	constructor(props){
		super(props);
	}
 
	setTimeout=(evt)=>{
		this.setState({timeout:evt.target.value});
	}
	setInfinity=(evt)=>{
		this.setState({isInfinity:evt.target.checked});
	}
	load=()=>{
		this.props.load(this.state.isInfinity?Infinity:this.state.timeout);
	}
 
	render(){
		return (
			<div>
				<h3>{'Panel '+this.props.ix}</h3>
				<this.props.children active={this.props.active} button={this.button} />
				<div>
					stop after
					<input type='number' min='0' disabled={this.state.isInfinity} value={this.state.timeout} onChange={this.setTimeout}/>
					sec
					<input type='checkbox'  checked={this.state.isInfinity} onChange={this.setInfinity} />
					Infinity
				</div>
				<div>
					<button onClick={this.load} ref={(btn)=>{this.button=btn}}>Load</button>
					<button onClick={this.props.stop} style={{display:this.props.active && this.state.isInfinity?'inline-block':'none'}} >Stop</button>
				</div>
			</div>
		)
	}
}
Panel.propTypes={
	active:PropTypes.bool,
	load:PropTypes.func,
	button:PropTypes.node,
}
 
function mapStateToProps(state, ownProps){
	return {
		active: state['load'+ownProps.ix]
	}
}
 
function mapDispatchToProps(dispatch, ownProps){
	return {
		load:(timeout)=> dispatch(load(ownProps.ix, timeout)),
		stop:()=> dispatch(stop(ownProps.ix))
	}
}
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Panel);
 
