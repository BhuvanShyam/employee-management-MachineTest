import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get("/api/employees");
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    await axios.delete(`/api/employees/${id}`);
    setEmployees(employees.filter((emp) => emp._id !== id));
  };

  return (
    <div>
      <h1>Employee List</h1>
      <Link to="/employees/create">Create New Employee</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(", ")}</td>
              <td>
                <Link to={`/employees/edit/${employee._id}`}>Edit</Link>
                <button onClick={() => deleteEmployee(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
