const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
            unique: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Region', regionSchema);