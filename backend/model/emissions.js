const mongoose = require("mongoose");

const emissionSchema = new mongoose.Schema({
    emissionValue: {
        type: Number,
    },
    totalEmission: {
        type: Number,
    },
    mineId: {
        type: Schema.Types.ObjectId,
        ref: "Mine",
    },
    activityId: {
        type: Schema.Types.ObjectId,
        ref: "Activity",
    },
});

module.exports = mongoose.model("Emission", emissionSchema);
