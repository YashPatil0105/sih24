const mongoose = require("mongoose");

const mineSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    mineType: {
        type: String,
    },
    size: {
        type: Number,
    },
    totalEmission: {
        type: Number,
    },
    numberOfEmployees: {
        type: Number,
    },
    energyId: {
        type: Schema.Types.ObjectId,
        ref: "Energy",
    },
    activityId: {
        type: Schema.Types.ObjectId,
        ref: "Activity",
    },
});

module.exports = mongoose.model("Mine", mineSchema);
