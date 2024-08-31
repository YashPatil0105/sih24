const Factors = require("../model/emissionFactors");

const excavation = async (req, res) => {
    try {
        const { emissionFactorValue } = await Factors.findOne({
            causeOfEmission: req.body.causeOfEmission,
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
            causeOfEmission: req.body.causeOfEmission,
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
        if (req.body.type == "Diesel") {
            const { operatingHours, fuelConsumptionRate } = req.body;

            const totalEmission = operatingHours * fuelConsumptionRate * 2.68;

            return res.status(200).json({ totalEmission });
        } else {
            const { powerConsumption } = req.body;

            const totalEmission = powerConsumption * 0.82;

            return res.status(200).json({ totalEmission });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

const blasting = async (req, res) => {
    try {
        const { emissionFactorValue } = await Factors.findOne({
            causeOfEmission: req.body.causeOfEmission,
        });

        const { amountOfExplosive } = req.body;

        const totalEmission = amountOfExplosive * emissionFactorValue;

        return res.status(200).json({ totalEmission });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const powerConsumption = async (req, res) => {
    try {
        const { dailyPowerConsumption } = req.body;

        const totalEmission = dailyPowerConsumption * 0.82;

        return res.status(200).json({ totalEmission });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const water = async (req, res) => {
    try {
        if (req.body.type == "Diesel") {
            const { waterPumped, fuelConsumptionRate } = req.body;

            const totalEmission = waterPumped * fuelConsumptionRate * 2.68;

            return res.status(200).json({ totalEmission });
        } else {
            const { powerConsumption } = req.body;

            const totalEmission = powerConsumption * 0.82;

            return res.status(200).json({ totalEmission });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

const employeeTransportation = async (req, res) => {
    try {
        const { emissionFactorValue } = await Factors.findOne({
            causeOfEmission: req.body.causeOfEmission,
        });

        const { distanceCovered, numberOfEmployees, fuelConsumptionRate } =
            req.body;

        const totalEmission =
            distanceCovered *
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
