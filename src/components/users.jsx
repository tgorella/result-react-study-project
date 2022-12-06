import React, { useState, useEffect } from "react";
import api from "../api/index";
import Pagination from "./pagination";
import RenderPhrase from "./searchStatus";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import UsersTable from "./usersTable";
import _ from "lodash";
const Users = () => {
  // useEffect(() => {
  //   if (usersCrop <= pageSize) {
  //     setCurrentPage(1);
  //   }
  // }, [usersCrop]);
  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((usersData) => setUsers(usersData));
  }, []);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageSize = 4;

  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

   useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  
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
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearfilter = () => {
      setSelectedProf(undefined);
    };

    return (
      <div className="d-flex">
        {professions && (
          <div
            className="d-flex flex-column flex-shrink-0 p-3"
            style={{ marginTop: "50px", marginRight: "40px" }}
          >
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
        <div className="d-flex flex-column" style={{ width: "100%" }}>
          <h1>
            <RenderPhrase number={count} />
          </h1>
          {users.length > 0 && (
            <UsersTable
              users={usersCrop}
              handleDelete={handleDelete}
              handleFavorite={handleFavorite}
              onSort={handleSort}
              selectedSort={sortBy}
            />
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
  }
  return "Загрузка...";
};

export default Users;
