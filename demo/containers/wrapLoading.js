import React from 'react';
import Block from './blockWrapper';
import ControlCtnr from './controlWrapper';
 
let ix=0;
export default function wrapper(Loading, title, desc){
	ix++;
	function GetLoadingControl(ix){
		return function LoadingControl(){
			return <ControlCtnr ix={ix}>{Loading}</ControlCtnr>
		}
	}
	return Block(GetLoadingControl(ix), title, desc);
}
 
