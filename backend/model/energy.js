const mongoose = require("mongoose");

const energySchema = new mongoose.Schema({
    sourceName: {
        type: String,
    },
    energyProduction: {
        type: Number,
    },
    impactOnEmission: {
        type: Number,
    },
});

module.exports = mongoose.model("Energy", energySchema);
