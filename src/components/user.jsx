import React from 'react'
import Bookmark from './bookmark'
import Qualitie from './qualitie'

const User = (props) => {
	return (
		<tr scope="row">
					<td>{props.name}</td>
					<td>
						<ul>
						{props.qualities.map((quality) => (
<Qualitie key={quality._id}  {...quality} />
					))}
					</ul>
					</td>
					<td>{props.profession.name}</td>
					<td>{props.completedMeetings}</td>
					<td>{props.rate}</td>
					<td><Bookmark userId={props._id} bookmark={props.bookmark} onFavorite={props.onFavorite}/></td>
					<td><button className="btn btn-danger" onClick={() => props.onDelete(props._id)}>delete</button></td>
				</tr>
	)
}

export default User