import React from 'react';
import './App.css';
import EmployeeTable from "./components/EmployeeTable";



function App() {
  return (
  <div className="container">
  <div className="row justify-content-center">
    <h1 className="text-align-center" style={{"margin-top":"20px", "margin-bottom":"20px"}}>
      Employee Details
    </h1>
  </div>
    <EmployeeTable />
  </div>)
}

export default App;
