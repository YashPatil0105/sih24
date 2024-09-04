const Factors = require("../model/emissionFactors");

const excavation = async (req, res) => {
    try {
        const { emissionFactorValue } = await Factors.findOne({
            causeOfEmission: req.body.fuelType,
        });

        const { operatingHours, fuelConsumptionRate } = req.body;

        const totalEmission =
            operatingHours * fuelConsumptionRate * emissionFactorValue;

        return res.status(200).json({ totalEmission });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const transportation = async (req, res) => {
    try {
        const { emissionFactorValue } = await Factors.findOne({
            causeOfEmission: req.body.fuelType,
        });

        const { distanceCovered, numberOfTrips, fuelConsumptionRate } =
            req.body;

        const totalEmission =
            distanceCovered *
            numberOfTrips *
            fuelConsumptionRate *
            emissionFactorValue;

        return res.status(200).json({ totalEmission });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const equipment = async (req, res) => {
    try {
        if (req.body.energySource == "Diesel") {
            const { operatingHours, energyConsumptionRate } = req.body;

            const totalEmission = operatingHours * energyConsumptionRate * 2.68;

            return res.status(200).json({ totalEmission });
        } else {
            const { energyConsumptionRate } = req.body;

            const totalEmission = energyConsumptionRate * 0.82;

            return res.status(200).json({ totalEmission });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

const blasting = async (req, res) => {
    try {
        const { emissionFactorValue } = await Factors.findOne({
            causeOfEmission: req.body.explosiveType,
        });

        const { amountUsed } = req.body;

        const totalEmission = amountUsed * emissionFactorValue;

        return res.status(200).json({ totalEmission });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const powerConsumption = async (req, res) => {
    try {
        const { dailyConsumption } = req.body;

        const totalEmission = dailyConsumption * 0.82;

        return res.status(200).json({ totalEmission });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const water = async (req, res) => {
    try {
        if (req.body.pumpType == "Diesel") {
            const { waterPumped, energyConsumptionRate } = req.body;

            const totalEmission = waterPumped * energyConsumptionRate * 2.68;

            return res.status(200).json({ totalEmission });
        } else {
            const { energyConsumptionRate } = req.body;

            const totalEmission = energyConsumptionRate * 0.82;

            return res.status(200).json({ totalEmission });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

const employeeTransportation = async (req, res) => {
    try {
        const { emissionFactorValue } = await Factors.findOne({
            causeOfEmission: req.body.fuelType,
        });

        const { distanceTraveled, numberOfEmployees, fuelConsumptionRate } =
            req.body;

        const totalEmission =
            distanceTraveled *
            numberOfEmployees *
            fuelConsumptionRate *
            emissionFactorValue;

        return res.status(200).json({ totalEmission });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const waste = async (req, res) => {
    try {
        const { disposalMethod, wasteType, amountGenerated } = req.body;
        const { emissionFactorValue } = await Factors.findOne({
            causeOfEmission: req.body.disposalMethod,
        });
        switch (disposalMethod) {
            case "Backfilling":
                const totalEmissionBackFilling =
                    6 * amountGenerated * emissionFactorValue;
                return res.status(200).json({ totalEmissionBackFilling });
            case "Surface Impoundment":
                const totalEmissionSI =
                    15.161 * amountGenerated * emissionFactorValue;
                return res.status(200).json({ totalEmissionSI });
            default:
                const totalEmission = amountGenerated * emissionFactorValue;
                return res.status(200).json({ totalEmission });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    excavation,
    transportation,
    equipment,
    blasting,
    powerConsumption,
    water,
    employeeTransportation,
    waste,
};
