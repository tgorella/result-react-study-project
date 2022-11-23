import React, { useState } from "react";
import api from "../api";
import Pagination from "./pagination";
import RenderPhrase from "./searchStatus";
import User from "./user";
import { paginate } from "../utils/paginate";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

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

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      <h1>
        <RenderPhrase number={users.length} />
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
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
