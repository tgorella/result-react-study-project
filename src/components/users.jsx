import React, { useState, useEffect } from "react";
import api from "../api/index";
import Pagination from "./pagination";
import RenderPhrase from "./searchStatus";
import User from "./user";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    api.users.fetchAll().then((usersData) => setUsers(usersData));
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleDelete = (userId) => {
    setUsers((prevState) =>
      prevState.filter((user) => {
        return user._id !== userId;
      })
    );
  };

  const handleFavorite = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : users;

  const count = filteredUsers.length;

  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const clearfilter = () => {
    setSelectedProf(undefined);
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={[professions]}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearfilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <h1>
          <RenderPhrase number={count} />
        </h1>
        {users.length > 0 && (
          <table className="table">
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
              {userCrop.map((user) => (
                <User
                  key={user._id}
                  {...user}
                  onDelete={handleDelete}
                  onFavorite={handleFavorite}
                />
              ))}
            </tbody>
          </table>
        )}
        <div className="div d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
