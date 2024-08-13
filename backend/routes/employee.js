const express = require('express');
const multer = require('multer');
const Employee = require('../models/Employee');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  try {
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course: course.split(','),
      image: req.file.path
    });
    await newEmployee.save();
    res.json(newEmployee);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course ? course.split(',') : employee.course;

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
