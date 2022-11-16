import React from 'react'

const Bookmark = (props) => {

	return (
		<button className='btn btn-outline-dark' onClick={() => props.onFavorite(props.userId)}>{props.bookmark 
			? <i className="bi bi-bookmark-check-fill"></i> 
			: <i className="bi bi-bookmark-plus"></i>}
		</button>
	)

}

export default Bookmark