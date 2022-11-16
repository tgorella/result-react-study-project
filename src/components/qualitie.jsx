import React from 'react'

const Qualitie = (props) => {

	return (
<li className={'badge '+ 'bg-'+props.color+' m-1'} key={props._id}>{props.name} </li>

	)
}

export default Qualitie