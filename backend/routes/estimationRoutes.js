const express = require("express");
const router = express.Router();

const {
    excavation,
    transportation,
    equipment,
    blasting,
    powerConsumption,
    employeeTransportation,
    water,
} = require("../controllers/estimationController");

router.route("/excavation").post(excavation);
router.route("/transportation").post(transportation);
router.route("/equipment").post(equipment);
router.route("/blasting").post(blasting);
router.route("/power").post(powerConsumption);
router.route("/water").post(water);
router.route("/employeeTransport").post(employeeTransportation);
router.route("/waste").post();

module.exports = router;
