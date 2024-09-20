const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active' , 'blocked'],
      default: 'active',
    },
    lastLogin: {
      type: Date,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    blocked: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    }
  }, {timestamps: true}
)

const User = mongoose.model('User', userSchema)
module.exports = User;