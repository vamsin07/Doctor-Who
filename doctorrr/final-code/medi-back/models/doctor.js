const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        },
        department: {
            type: ObjectId,
            ref: 'Department',
            required: true
        },
        qualification: {
            type: String,
            required: true,
            maxlength: 500
        },
        hospital: {
            type: ObjectId,
            ref: 'Hospital',
            required: true
        },
        region: {
            type: ObjectId,
            ref: 'Region',
            required: true
        },
        country: {
            type: ObjectId,
            required: true,
            ref: 'Country'
        },
        specialisation: {
            type: ObjectId,
            ref: 'Treatment',
            required: true
        },
        experience: {
            type: String,
            required: true,
            maxlength: 500
        },
        achievement: {
            type: String,
            required: true,
            maxlength: 500
        },
        education: {
            type: String,
            required: true,
            maxlength: 500
        },
        photo: {
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

module.exports = mongoose.model('Doctor', doctorSchema);