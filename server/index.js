const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./src/models/user.model.Js');
const mongoose = require('mongoose');

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

app.post('/api/v1/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('User already exists');
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, registrationTime: new Date(), status: 'active' });
  await user.save();
  res.status(201).json({ message: 'User created successfully' });
});

app.post('/api/v1/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // check email
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  // check Pass
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  // update last login time
  user.lastLogin = new Date();
  await user.save();

  // generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        status: user.status
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
  );
  console.log(req.body);
  res.cookie("userToken", token)
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, status: user.status } });

});

app.get('/api/v1/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.status(201).json(users);
});

app.get('/api/v1/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select('-password');
  res.status(201).json(user);
});

app.post('/api/v1/block', async (req, res) => {
  const { userIds } = req.body;
  const userToken = (req.rawHeaders[req.rawHeaders.length - 1].split("="))[1];
  console.log(userToken);

  // not working accurately
  // const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
  //   const [name, value] = cookie.trim().split('=');
  //   acc[name] = value;
  //   return acc;
  // }, {});


  if (!userToken) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    console.log(req.user)
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Push the userIds to block into the user's blockedUsers array
    user.blocked = user.blocked || []; // Ensure the array exists
    user.blocked.push(...userIds.filter(id => !user.blocked.includes(id)));
    await user.save();

    res.status(200).json({ message: 'Users blocked successfully', user });
  } catch (error) {
    console.error('Error blocking users:', error);
    res.status(500).json({ message: 'An error occurred while blocking users' });
  }
});

app.post('/api/v1/unblock', async (req, res) => {
  const { userIds } = req.body;
  const userToken = (req.rawHeaders[req.rawHeaders.length - 1].split("="))[1];
  console.log(userToken);

  // not working accurately
  // const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
  //   const [name, value] = cookie.trim().split('=');
  //   acc[name] = value;
  //   return acc;
  // }, {});

  if (!userToken) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    console.log(req.user)
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Push the userIds to block into the user's blockedUsers array
    user.blocked = user.blocked || []; // Ensure the array exists
    // Remove the userIds from the user's blocked array
    user.blocked = user.blocked.filter(blockedId => !userIds.includes(blockedId.toString()));
    await user.save();

    res.status(200).json({ message: 'Users blocked successfully', user });
  } catch (error) {
    console.error('Error blocking users:', error);
    res.status(500).json({ message: 'An error occurred while blocking users' });
  }
});

app.post('/api/v1/admin/delete', async (req, res) => {
  const { userIds } = req.body;
  await User.deleteMany({ _id: { $in: userIds } });
  res.status(500).json({ message: 'Users deleted successfully' });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});