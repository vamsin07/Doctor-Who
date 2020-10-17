const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const regionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
            unique: true
        },
        country: {
            type: ObjectId,
            required: true,
            ref: 'Country'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Region', regionSchema);