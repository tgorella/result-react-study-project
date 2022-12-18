import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api/index";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((usersData) => setUser(usersData));
  }, []);

  const handleMoveToUsersList = () => {
    history.push("/users");
  };
  if (user) {
    return (
      <div>
        {" "}
        <h1>{user.name}</h1>
        <div>Профессия: {user.profession.name}</div>
        <div>
          Качества: <QualitiesList qualities={user.qualities} />
        </div>
        <div>Встретился, раз: {user.completedMeetings}</div>
        <div>Оценка: {user.rate} / 5</div>
        <button onClick={handleMoveToUsersList}>Все пользователи</button>
      </div>
    );
  }
  return "Загрузка...";
};
UserPage.propTypes = {
  userId: PropTypes.string
};
export default UserPage;
