import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, _id, name }) => {
  return (
    <li className={"badge " + "bg-" + color + " m-1"} key={_id}>
      {name}{" "}
    </li>
  );
};

Qualitie.propTypes = {
  color: PropTypes.string,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualitie;
