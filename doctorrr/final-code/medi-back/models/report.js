const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const reportSchema = new mongoose.Schema(
	{
		name: {
       		type: String,
            trim: true,
            required: true,
            maxlength: 100
        },
        photo: {
            data: Buffer,
            contentType: String
		},
		user: {
            type: ObjectId,
            ref: 'User',
            required: true
		},
		updated: Date
	},
	{ timestamp: true }
);

module.exports = mongoose.model('Report', reportSchema);