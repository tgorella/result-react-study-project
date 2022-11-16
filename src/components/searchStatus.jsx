import { render } from '@testing-library/react'
import React from 'react'

const RenderPhrase = (props) => {
	const person = () => {
		if ((props.number % 10 === 2 && props.number !==12) || (props.number % 10 === 3 && props.number !== 13) || (props.number % 10 === 4 && props.number !== 14)) {
			return 'человека'
		} else {
			return 'человек'
		}
	}

	return props.number !== 0	
	? (<span className="badge bg-primary">{props.number + ' '+ person() +' тусанет с тобой сегодня'}</span>) 
	: (<span className="badge bg-danger">Никто с тобой не тусанет</span>);
}

export default RenderPhrase