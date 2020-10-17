const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const hospitalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        },
        region: {
            type: ObjectId,
            ref: "Region",
            required: true
        },
        country: {
            type: ObjectId,
            ref: "Country",
            required: true
        },
        about: {
            type: String,
            required: true,
            maxlength: 2000
        },
        doctor: {
            type: ObjectId,
            ref: 'Doctor',
            required: true
        },
        address: {
            type: String,
            required: true,
            maxlength: 500
        },
        facilities: {
            type: String,
            required: true,
            maxlength: 500
        },
        photo1: {
            data: Buffer,
            contentType: String
        },
        photo2: {
            data: Buffer,
            contentType: String
        },
        photo3: {
            data: Buffer,
            contentType: String
        },
        photo4: {
            data: Buffer,
            contentType: String
        },
        photo5: {
            data: Buffer,
            contentType: String
        },
        popularity: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Hospital', hospitalSchema);