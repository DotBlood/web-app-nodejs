const mongoose = require('mongoose');

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    // User.findOneById(id).select('+password')
    password: {
      type: String,
      required: true,
      select: true
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema);

module.exports = User;