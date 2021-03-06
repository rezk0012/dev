const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Station = require('../models/Station');


//------------------------------------------//
//                  ADD Station             //
//------------------------------------------//

router.post('/', (req, res, next) => {

    User.find({ serial: req.body.serial }).exec()
        .then(stn => {
            if (stn.length >= 1) {
                return res.status(400).json({
                    message: 'Station already exist'
                })
            } else {
                const station = new Station({
                    _id: mongoose.Types.ObjectId(),
                    serial: req.body.serial,
                    type: req.body.type,
                    chargePoint: req.body.chargePoint,
                    chargeBox: req.body.chargeBox,
                    qrCode: req.body.qrCode,
                    firmware: req.body.firmware,
                    date: new Date(),
                    simType: req.body.simType,
                    simcard: {
                        iccid: req.body.ccid,
                        simStatus: req.body.simStatus,
                        ActDate: req.body.ActDate,
                        inSession: req.body.inSession,
                        data: req.body.data

                    }
                });
                station.save().then(result => {
                    res.status(201).json({
                        message: 'Station Created Succesfully'
                    });
                })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Failure to create Station',
                            error: err
                        });
                    });
            }
        });

});

//------------------------------------------//
//                  GET User                //
//------------------------------------------//

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id).then(stn => {
        if (stn) {
            res.status(200).json(stn);
        } else {
            res.status(404).json({ message: "Station not found!" });
        }
    });
});

//------------------------------------------//
//                  EDIT User                //
//------------------------------------------//

router.put('/:id', multer({ storage: storage }).single("image"), (req, res, next) => {
    let user_email;
    let user_img;

    User.findById({ _id: req.params.id }).exec()
        .then(user => {
            user_email = user.email;
            user_img = user.image;
        })

    //If the user uploading image 
    if (req.file) {
        var url = req.protocol + "://" + req.get("host");
        var image = url + "/images/" + req.file.filename;
    } else {
        image = user_img;
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            User.find({ email: req.body.email }).exec()
                .then(user => {

                    if (user.length >= 1 && user_email !== req.body.email) {
                        return res.status(400).json({
                            message: 'Email already exist'
                        })
                    } else {

                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            user_type: req.body.user_type,
                            org: req.body.org,
                            image: image
                        });
                        User.updateOne({ _id: req.params.id }, user).then(result => {
                            res.status(200).json({
                                message: "User updated successful!"
                            });
                        }).catch(err => {
                            res.status(500).json({
                                message: 'Failure to update user',
                                error: err
                            });
                        });
                    }
                });
        }
    });
});

//------------------------------------------//
//                  Delete User             //
//------------------------------------------//
router.delete("/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(rec => {
            console.log(rec)
            res.status(200).json({
                message: "User Deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
//------------------------------------------//
//                  Get All Users           //
//------------------------------------------//


router.get("/", (req, res) => {
    User.find()
        .then(rec => {
            res.status(200).json(rec);
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
});



//------------------------------------------//
//                  ADD User                //
//------------------------------------------//
router.post('/addAdmin', multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let fileName;

    if (!req.file) {

        console.log('No file')
        fileName = 'no-user.jpg';
    } else {
        fileName = req.file.filename
    }

    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(400).json({
                    message: 'Email already exist'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            user_type: 'Admin',
                            org: req.body.org,
                            image: url + "/images/" + fileName
                        });
                        user.save().then(result => {
                            res.status(201).json({
                                message: 'Admin Created Succesfully'
                            });
                        })
                            .catch(err => {
                                res.status(500).json({
                                    message: 'Failure to create Admin',
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

//------------------------------------------//
//               Login Users/Admin          //
//------------------------------------------//
router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth Failure, User Not exists'
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return es.status(401).json({
                            message: ' Auth Failed'
                        })
                    }

                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, 'secret', { expiresIn: "1h" });
                        return res.status(200).json({
                            message: 'Auth Successful',
                            user_type: user[0].user_type,
                            token: token
                        });
                    }

                    return res.status(401).json({
                        message: ' Auth Failed'
                    })

                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;

// router.post('/forgetPassword')