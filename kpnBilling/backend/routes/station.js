const express = require("express");
const Station = require("../models/station");
const router = express.Router();
const mongoose = require("mongoose");


//Adding Station 
router.post("/add", (req, res, next) => {
    console.log(req.body)
        const station = new Station({
            _id: mongoose.Types.ObjectId(),
            serial: req.body.serial,
            type: req.body.type,
            chargePoint: req.body.chargePoint,
            chargeBox: req.body.chargeBox,
            qrCode: req.body.qrCode,
            iccid: req.body.iccid,
            firmware: req.body.firmware,
            date: new Date(),
        });

        station.save().then(data => {
            res.status(201).json({
                message: "Station added successfully",
                station: data
            });
        }).catch(error =>{
            res.status(500).json({
                error:error
            })
        });
    }
);

//EDIT STATION 
router.put("/:id", (req, res, next) => {

    const station = new Station({
        _id: mongoose.Types.ObjectId(),
        serial: req.body.serial,
        type: req.body.type,
        chargePoint: req.body.chargePoint,
        chargeBox: req.body.chargeBox,
        qrCode: req.body.qrCode,
        iccid: req.body.iccid,
        firmware: req.body.firmware,
        date: new Date(),
    });
        station.updateOne({ _id: req.params.id }, Station).then(result => {
            res.status(200).json({
                message: "Station Updated successful!"
            });
        });
    }
);


//GET ALL Stations 
router.get("/all", (req, res, next) => {
    Station.find().then(documents => {
        res.status(200).json({
            message: "Stations fetched successfully!",
            station: documents
        });
    });
});

// GET Specific station 
router.get("/:id", (req, res, next) => {
    Station.findById(req.params.id).then(Station => {
        if (Station) {
            res.status(200).json(Station);
        } else {
            res.status(404).json({ message: "Station not found!" });
        }
    });
});

router.delete("/:id", (req, res, next) => {
    Station.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({ message: "Station deleted!" });
    });
});

module.exports = router;
