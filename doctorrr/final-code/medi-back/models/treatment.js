const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        department: {
            type: ObjectId,
            ref: 'Department',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Treatment', treatmentSchema);