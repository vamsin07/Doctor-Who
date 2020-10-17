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
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        },
        country: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
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
        country: {
            type: ObjectId,
            required: true,
            ref: 'Country'
        },
        region: {
            type: ObjectId,
            ref: 'Region',
            required: true
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