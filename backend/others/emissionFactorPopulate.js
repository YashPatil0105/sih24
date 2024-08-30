const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();
const Factors = require("../model/emissionFactors");

const connectDB = require("../db/connect");

const populateEmissionFactors = async () => {
    try {
        connectDB(process.env.MONGO_URI);

        const results = [];
        fs.createReadStream("/backend/csv/emission_factors_converted.csv")
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                const factorDocuments = results.map((row) => ({
                    causeOfEmission: row["Category"],
                    emissionFactorValue: parseFloat(
                        row["Emission Factor (kg CO2)"]
                    ),
                }));

                await Factors.insertMany(factorDocuments);
                console.log("Data successfully populated!");
                mongoose.connection.close();
            });
    } catch (error) {
        console.error("Error populating data:", error);
        mongoose.connection.close();
    }
};

populateEmissionFactors();
