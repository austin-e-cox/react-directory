import React from "react";

function Employee(props) {
  return (
    <tr>
      <td>{props.firstname}</td>
      <td>{props.lastname}</td>
      <td>{props.occupation}</td>
      <td>{props.location}</td>
    </tr>
  );
}

export default Employee;