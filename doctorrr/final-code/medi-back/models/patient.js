const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
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
		country: {
			type: String,
			required: true
		},
		location: {
			type: String,
			trim: true,
			required: true,
			maxlength: 50
		},
		gender: {
			type: String,
			required: true
		},
		age: {
			type: Number,
			required: true
		},
		dob: {
			type: String,
			required: true
		},
		description: {
			type: String,
			trim: true,
			maxlength: 200,
			required: true
		},
		photo: {
            data: Buffer,
            contentType: String
		},
		about: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);