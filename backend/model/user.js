const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User name is required"],
    },
    password: {
        type: String,
        required: true,
        default: "",
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email address format",
        },
        unique: true,
        lowercase: true,
    },
});

module.exports = mongoose.model("User", userSchema);
