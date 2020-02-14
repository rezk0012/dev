const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    serial: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    chargePoint: {
        type: String,
        required: true
    },
    chargeBox: {
        type: String,
        required: true
    },
    qrCode: String,
    firmware: String,
    date: String,
    simType:String,
    img:String,
    simcard: {
        iccid: String,
        simStatus: String,
        ActDate: String,
        inSession: Boolean,
        data: Number
    }
});

module.exports = mongoose.model('User', userSchema);
