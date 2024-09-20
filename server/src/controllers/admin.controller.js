const asyncHandler = require("../utils/asyncHandler");
const jwt = require('jsonwebtoken');
const User = require("../models/user.model.Js");

const blockUser = asyncHandler(async (req, res) => {
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
    user.blocked.push(...userIds.filter(id => !user.blocked.includes(id) && id !== user._id.toString()));
    await user.save();

    res.status(200).json({ message: 'Users blocked successfully', user });
  } catch (error) {
    console.error('Error blocking users:', error);
    res.status(500).json({ message: 'An error occurred while blocking users' });
  }
});

const unblockUser = asyncHandler(async (req, res) => {
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


const deleteUser = asyncHandler(async (req, res) => {
  const { userIds } = req.body;
  // 
  await User.deleteMany({ _id: { $in: userIds } });
  res.status(500).json({ message: 'Users deleted successfully' });
});

module.exports = {blockUser, unblockUser, deleteUser};