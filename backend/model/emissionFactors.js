const mongoose = require("mongoose");

const emissionFactorsSchema = new mongoose.Schema({
    causeOfEmission: {
        type: String,
    },
    emissionFactorValue: {
        type: Number,
    },
});

module.exports = mongoose.model("Factors", emissionFactorsSchema);
