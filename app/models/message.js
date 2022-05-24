const mongoose = require('mongoose');

const { Schema, model } = mongoose

const msgShema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: false
    },
    msg: {
      type: String,
      required: true,
      unique: false
    }
  },
  {
    timestamps: true
  }
)

const Msg = mongoose.model('Message', msgShema);

module.exports = Msg;