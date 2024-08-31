const mongoose = require("mongoose");

const forestSchema = new mongoose.Schema({
    stateName: {
        type: String,
    },
    currentForestArea: {
        type: Number,
    },
    availableArea: {
        type: Number,
    },
});

module.exports = mongoose.model("Forest", forestSchema);
