import React, { Component } from "react";
import employees from "../assets/employees.json";
import Employee from "./Employee";

const sortIndices = (arr) => {
  var len = arr.length;
  var indices = new Array(len);
  for (var i = 0; i < len; ++i) indices[i] = i;
    indices.sort(function (a, b) { return arr[a] < arr[b] ? -1 : arr[a] > arr[b] ? 1 : 0; });
  return indices
  // https://stackoverflow.com/questions/3730510/javascript-sort-array-and-return-an-array-of-indicies-that-indicates-the-positi
}
// create initial array stating whether each column is ascending or descending and defualt to descending
let b = Array(Object.keys(employees[0]).length).fill(false)
let entries = Object.keys(employees[0]).map((e,i) => [e,b[i]]);
let ascending = Object.fromEntries(entries);

let sortCol = "";

// Employee table class. If user clicks header, it sorts by that column
class EmployeeTable extends Component {
  // set the initial state
  state = {
    employees,
    ascending,
    sortCol
  };

  getIcon = (attr) => {
    let sortText = "";
    if (this.state.ascending[attr])
      sortText = "fas fa-sort-up";
    else
      sortText = "fas fa-sort-down";
    return sortText
  }

  getStyle = (attr) => {
    let sortText = "";
    if (this.state.sortCol===attr){
      sortText ="blue";
    }
    else
      sortText = "black";
    return {color:sortText};
  }
  
  // sort the empoyees and set the new sorted employees (and as/decending status) to the component state 
  //   (called when header column is clicked)
  sortItems = (attr) => {
    let sortedEmployees = {};
    let names = employees.map((item) => item[attr]);
    let inds = sortIndices(names);
    sortedEmployees = inds.map((ind) => employees[ind]);
    let isAscending = ascending;
    if(isAscending[attr] === true){
      isAscending[attr] = false;
      sortedEmployees.reverse();
    }
    else{
      isAscending[attr] = true;
    }
    this.setState({ employees:sortedEmployees, ascending:isAscending, sortCol:attr })
  }
//<i className={(this.state.ascending["firstname"]) ? "fas fa-sort-up" : "fas fa-sort-down"}+{(this.state.sortCol==="firstname" ? " blue-text" : "")}></i>
  render() {
    return(
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.sortItems("firstname")} style={this.getStyle("firstname")}>
              <i className={this.getIcon("firstname")}></i>
              Firstname
            </th>
            <th onClick={() => this.sortItems("lastname")} style={this.getStyle("lastname")}>
              <i className={this.getIcon("lastname")}></i>
              Lastname
            </th> 
            <th onClick={() => this.sortItems("position")} style={this.getStyle("position")}>
              <i className={this.getIcon("position")}></i>
              Position
            </th>
            <th onClick={() => this.sortItems("location")} style={this.getStyle("location")}>
              <i className={this.getIcon("location")}></i>
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.employees.map(employee => (
            <Employee
              key ={employee.id}
              firstname={employee.firstname}
              lastname={employee.lastname}
              position={employee.position}
              location={employee.location}
            />)
          )}
        </tbody>
      </table>)
  }
}

export default EmployeeTable;