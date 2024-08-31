const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();
const Mine = require("../model/mine");

const connectDB = require("../db/connect");

const populateEmissionMines = async () => {
    try {
        connectDB(
            "mongodb+srv://purabrtamboli:purab@cluster0.mpzuz25.mongodb.net/SIH2024?retryWrites=true&w=majority&appName=Cluster0"
        );

        const results = [];
        fs.createReadStream(
            "/home/purab/Desktop/sih24/backend/csv/methane_final.csv"
        )
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                const mineDocuments = results.map((row) => ({
                    name: row["Project"],
                    location: row["Coal Field"],
                    numberOfEmployees: parseFloat(row["Workforce"]) || 0,
                    production: parseFloat(row["Production (Mt)"]) || 0,
                    capacity: parseFloat(row["Capacity (Mt)"]) || 0,
                }));

                await Mine.insertMany(mineDocuments);
                console.log("Data successfully populated!");
                mongoose.connection.close();
            });
    } catch (error) {
        console.error("Error populating data:", error);
        mongoose.connection.close();
    }
};

populateEmissionMines();
