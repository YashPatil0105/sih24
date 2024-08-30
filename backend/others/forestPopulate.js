const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();
const Forest = require("../model/forest");

const connectDB = require("../db/connect");

const populateForestData = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        const results = [];
        fs.createReadStream("/backend/csv/complete_forest_data.csv")
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                const forestDocuments = results.map((row) => ({
                    stateName: row["State Name"],
                    currentForestArea: parseFloat(
                        row["Area of Existing Forest (in '000 ha)"]
                    ),
                    availableArea: parseFloat(
                        row["Area Available for New Forest (in '000 ha)"]
                    ),
                }));

                await Forest.insertMany(forestDocuments);
                console.log("Data successfully populated!");
                mongoose.connection.close();
            });
    } catch (error) {
        console.error("Error populating data:", error);
        mongoose.connection.close();
    }
};

populateForestData();
