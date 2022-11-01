const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
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
    phone: {
      type: Number,
      required: true,
    },
    isAdmin: false,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
