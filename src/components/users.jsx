import React, {useState} from "react";
import api from '../api';
import RenderPhrase from "./searchStatus";
import User from "./user";

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll());
	
	const handleDelete = (userId) => {
		setUsers(prevState => prevState.filter((user) => {
			return user._id !== userId;
		}))
	}

	const handleFavorite = (userId) => {
		const updatedUsers = users.map((user) => {
			if (user._id === userId) {
				user.bookmark = !user.bookmark;
			}
			return user;
		})
		setUsers(updatedUsers)
	}

	return (
		<>
		<h1 ><RenderPhrase number={users.length}/></h1>
		{users.length > 0 && (<table className="table">
		<thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Оценка</th>
      <th scope="col">Избранное</th>
      <th scope="col"></th>
    </tr>
		</thead>
  <tbody>
		{
			users.map((user) => (
				<User
				key={user._id}
				{...user} 
				onDelete={handleDelete}
				onFavorite= {handleFavorite} />
			))
		}
		</tbody>
		</table>)}
		</>
	);
}

export default Users;