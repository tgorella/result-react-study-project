import React, {useState} from "react";
import api from '../api';

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll());
	const handleDelete = (userId) => {
		setUsers(prevState => prevState.filter((user) => {
			return user._id !== userId;
		}))
	}

	const renderPhrase = (number) => {
		const person = () => {
			if ((number % 10 === 2 && number !==12) || (number % 10 === 3 && number !== 13) || (number % 10 === 4 && number !== 14)) {
				return 'человека тусанут'
			} else {
				return 'человек тусанет'
			}
		}

		return number !== 0	
		? (<span className="badge bg-primary">{number + ' '+ person() +' с тобой сегодня'}</span>) 
		: (<span className="badge bg-danger">Никто с тобой не тусанет</span>);
	}

	return (
		<>
		<h1 >{renderPhrase(users.length)}</h1>
		{users.length > 0 && (<table className="table">
		<thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Оценка</th>
      <th scope="col"></th>
    </tr>
		</thead>
  <tbody>
		{
			users.map((user) => (
				<tr scope="row" key={user._id}>
					<td>{user.name}</td>
					<td>
						<ul>
						{user.qualities.map((quality) => (
<li className={'badge '+ 'bg-'+quality.color+' m-1'} key={quality._id}>{quality.name} </li>
					))}
					</ul>
					</td>
					<td>{user.profession.name}</td>
					<td>{user.completedMeetings}</td>
					<td>{user.rate}</td>
					<td><button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>delete</button></td>
				</tr>
			))
				}
		</tbody>
		</table>)}
		</>


	);
}

export default Users;
