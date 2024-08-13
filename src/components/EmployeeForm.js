import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: null
  });

  const navigate = useNavigate();  // Updated to useNavigate
  const { id } = useParams(); // For editing, if there's an ID

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        const res = await axios.get(`/api/employees/${id}`);
        setEmployee({
          ...res.data,
          course: res.data.course.join(', ')
        });
      };
      fetchEmployee();
    }
  }, [id]);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEmployee({ ...employee, image: files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in employee) {
      formData.append(key, employee[key]);
    }

    try {
      if (id) {
        await axios.put(`/api/employees/${id}`, formData);
      } else {
        await axios.post('/api/employees', formData);
      }
      navigate('/employees');  // Updated to useNavigate
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={onChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="mobile"
        value={employee.mobile}
        onChange={onChange}
        placeholder="Mobile No"
        required
      />
      <input
        type="text"
        name="designation"
        value={employee.designation}
        onChange={onChange}
        placeholder="Designation"
        required
      />
      <select name="gender" value={employee.gender} onChange={onChange} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="text"
        name="course"
        value={employee.course}
        onChange={onChange}
        placeholder="Course (comma separated)"
        required
      />
      <input
        type="file"
        name="image"
        onChange={onChange}
        accept="image/png, image/jpeg"
        required={!id} // Make image upload mandatory only during creation
      />
      <button type="submit">{id ? 'Update' : 'Create'} Employee</button>
    </form>
  );
};

export default EmployeeForm;
