import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({
  onSort,
  selectedSort,
  columns,
  data,
  onDelete,
  handleFavorite,
  children
}) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
          />
          <TableBody
            columns={columns}
            data={data}
            onDelete={onDelete}
            handleFavorite={handleFavorite}
          />
        </>
      )}
    </table>
  );
};
Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  children: PropTypes.array
};
export default Table;
