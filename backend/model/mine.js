const mongoose = require("mongoose");

const mineSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    state: {
        type: String,
    },
    production: {
        type: Number,
    },
    capacity: {
        type: Number,
    },
    totalEmission: {
        type: Number,
    },
    numberOfEmployees: {
        type: Number,
    },
    energyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Energy",
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
    },
});

module.exports = mongoose.model("Mine", mineSchema);
