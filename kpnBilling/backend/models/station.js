const mongoose = require("mongoose");

const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    serial: { type: String, required: true },
    type: { type: String, required: true },
    chargePoint: { type: String, required: true },
    chargeBox: { type: String, required: true },
    qrCode: { type: String },
    iccid: { type: String, required: true },
    firmware: { type: String, required: true },
    date: { type: String }
});

module.exports = mongoose.model("Station", stationSchema);