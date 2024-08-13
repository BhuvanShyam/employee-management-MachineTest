import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const username = localStorage.getItem('username'); // Assuming username was stored after login

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <Link to="/employees">Manage Employees</Link>
    </div>
  );
};

export default Dashboard;
