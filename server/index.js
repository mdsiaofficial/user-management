const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./src/models/user.model.Js');
const mongoose = require('mongoose');
const authRouter = require('./src/routes/auth.routes');
const adminRouter = require('./src/routes/admin.routes');
const userRouter = require('./src/routes/users.routes');


const app = express();

mongoose.connect('mongodb+srv://mdsiaofficial:task4@task4.r4znx.mongodb.net/usermanagement?retryWrites=true&w=majority&appName=task4')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.status(201).json({ message: "Home" });
})

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/user', userRouter)

app.use('/api/v1/admin', adminRouter)

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});