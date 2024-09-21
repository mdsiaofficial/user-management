require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./src/routes/auth.routes');
const adminRouter = require('./src/routes/admin.routes');
const userRouter = require('./src/routes/users.routes');
const cors = require('cors');

const app = express();
app.use(cors())

mongoose.connect(process.env.DB_URL)
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


app.listen(process.env.PORT || 4000, () => {
  console.log('Server listening on port 5000');
});