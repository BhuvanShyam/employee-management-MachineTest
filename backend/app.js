const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const employeeRouter = require('./routes/employee');

const app = express();

mongoose.connect('mongodb://localhost:27017/employee-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
