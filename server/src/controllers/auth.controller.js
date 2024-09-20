const User = require("../models/user.model.Js");
const asyncHandler = require("../utils/asyncHandler.js")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('User already exists');
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, registrationDate: new Date(), status: 'active' });
  await user.save();
  res.status(201).json({ message: 'User created successfully' });
});

const login = asyncHandler(async (req, res) => {
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


module.exports = {register, login};