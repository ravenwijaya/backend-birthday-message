const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: "First Name cannot be blank!",
  },
  last_name: {
    type: String,
    required: "Last Name cannot be blank!",
  },
  birthday_date: {
    type: Date,
    required: "Birthday_date cannot be blank!",
  },
  location: {
    type: String,
    required: "Location cannot be blank!",
  },
  celebrated: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
