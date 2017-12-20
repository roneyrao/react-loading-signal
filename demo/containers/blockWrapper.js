import css from '../main.css';
import React from 'react';
export default function(Comp, title, desc){
	return function Block(){
		return <div className={css.block}>
			<h3>{title}</h3>
			<h5>{desc}</h5>
			<Comp />
		</div>
	}
}
