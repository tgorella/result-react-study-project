import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
  users,
  handleDelete,
  handleFavorite,
  selectedSort,
  onSort
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          userId={user._id}
          bookmark={user.bookmark}
          onFavourite={handleFavorite}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(user._id)}
        >
          delete
        </button>
      )
    }
  };
  return (
    <>
      <Table
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
        data={users}
        onDelete={handleDelete}
        handleFavorite={handleFavorite}
      >
        <TableHeader
          onSort={onSort}
          selectedSort={selectedSort}
          columns={columns}
        />
        <TableBody
          columns={columns}
          data={users}
          onDelete={handleDelete}
          handleFavorite={handleFavorite}
        />
      </Table>
    </>
  );
};
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
