const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 50
		},
		email: {
			type: String,
			trim: true,
			required: true,
			maxlength: 50
		},
		contact: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			trim: true,
			maxlength: 200,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Visitor', visitorSchema);