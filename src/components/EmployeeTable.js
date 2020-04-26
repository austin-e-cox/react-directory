import React, { Component } from "react";
import sortedEmployees from "../assets/employees.json";
import Employee from "./Employee";
import "./index.css";

const sortIndices = (arr) => {
  var len = arr.length;
  var indices = new Array(len);
  for (var i = 0; i < len; ++i) indices[i] = i;
    indices.sort(function (a, b) { return arr[a] < arr[b] ? -1 : arr[a] > arr[b] ? 1 : 0; });
  return indices
  // https://stackoverflow.com/questions/3730510/javascript-sort-array-and-return-an-array-of-indicies-that-indicates-the-positi
}

// create initial array stating whether each column is ascending or descending and defualt to descending
let b = Array(Object.keys(sortedEmployees[0]).length).fill(false)
let entries = Object.keys(sortedEmployees[0]).map((e,i) => [e,b[i]]);
let ascending = Object.fromEntries(entries);

let sortCol = "";
let filteredEmployees = sortedEmployees;
let filters = {"filter-firstname":"", "filter-lastname":"", "filter-position":"", "filter-location":""};

// Employee table class. If user clicks header, it sorts by that column
class EmployeeTable extends Component {
  // set the initial state
  state = {
    sortedEmployees,
    filteredEmployees,
    ascending,
    sortCol,
    ...filters
  };

  firstnameR = React.createRef("");
  lastnameR = React.createRef("");
  positionR = React.createRef("");
  locationR = React.createRef("");

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
    let employees = {};
    let names = sortedEmployees.map((item) => item[attr]);
    let inds = sortIndices(names);
    employees = inds.map((ind) => sortedEmployees[ind]);
    let isAscending = ascending;
    if(isAscending[attr] === true){
      isAscending[attr] = false;
      employees.reverse();
    }
    else{
      isAscending[attr] = true;
    }
    this.setState({ sortedEmployees:employees, filteredEmployees:employees, ascending:isAscending, sortCol:attr, filters:this.filters })
    this.filterRows({target:{value:this[attr+"R"].current.value, name:attr}})
  }

  // filters rows down to what is in the assiciated input box
  filterRows = (event) => {
    // Getting the value and name of the input which triggered the change
    let searchText = event.target.value;
    if (searchText === ""){
      filters = {...filters, ["filter-"+event.target.name]:searchText}
      this.setState({ ...filters, sortedEmployees:this.state.sortedEmployees, filteredEmployees:this.state.sortedEmployees, ascending:this.state.ascending, sortCol:this.state.sortCol })
      return
    }
    
    let stl = searchText.toLowerCase();
    const name = event.target.name;
    let employees = this.state.sortedEmployees.filter((e) => e[name].toLowerCase().startsWith(stl))
    filters = {...filters, ["filter-"+event.target.name]:searchText}
    this.setState({ ...filters, sortedEmployees:this.state.sortedEmployees, filteredEmployees:employees, ascending:this.state.ascending, sortCol:this.state.sortCol })
  }

//<i className={(this.state.ascending["firstname"]) ? "fas fa-sort-up" : "fas fa-sort-down"}+{(this.state.sortCol==="firstname" ? " blue-text" : "")}></i>
  render() {
    return(
      <table className="table">
        <thead>
          <tr>
            <th style={this.getStyle("firstname")}>
              <div onClick={() => this.sortItems("firstname")} >
                <i className={this.getIcon("firstname")}></i>
                <div className="pr-15">First name</div>
              </div>
              <input value={this.state["filter-firstname"]} name="firstname" type="text" size="10" placeholder="filter firstname"
                onChange={this.filterRows}
                ref={this.firstnameR} />
            </th>
            <th style={this.getStyle("lastname")}>
              <div onClick={() => this.sortItems("lastname")} >
                <i className={this.getIcon("lastname")}></i>
                <div className="pr-15">Last name</div>
              </div>
              <input value={this.state["filter-lastname"]} name="lastname" type="text" size="10" placeholder="filter lastname"
                onChange={this.filterRows}
                ref={this.lastnameR} />
            </th>            
            <th style={this.getStyle("position")}>
              <div onClick={() => this.sortItems("position")} >
                <i className={this.getIcon("position")}></i>
                <div className="pr-15">Position</div>
              </div>
              <input value={this.state["filter-position"]} name="position" type="text" size="10" placeholder="filter position"
                onChange={this.filterRows}
                ref={this.positionR} />
            </th>            
            <th style={this.getStyle("location")}>
              <div onClick={() => this.sortItems("location")} >
                <i className={this.getIcon("location")}></i>
                <div className="pr-15">Location</div>
              </div>
              <input value={this.state["filter-location"]} name="location" type="text" size="10" placeholder="filter location"
                onChange={this.filterRows}
                ref={this.locationR} />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.filteredEmployees.map(employee => (
            <Employee
              key={employee.id}
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