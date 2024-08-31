const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    activityName: {
        type: String,
    },
    emissionFactor: {
        type: Number,
    },
    unit: {
        type: String,
    },
});

module.exports = mongoose.model("Activity", activitySchema);
