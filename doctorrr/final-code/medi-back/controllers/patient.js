const Patient = require('../models/patient');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.submitPatient = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        const { name, email, contact, country, location, gender, dob, description, about } = fields;

        if (!name || !email || !contact || !country || !location || !gender || !dob || !description || !about) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let patient = new Patient(fields);

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 10MB in size. Multiple images should be sent in a pdf format'
                });
            }
            patient.photo.data = fs.readFileSync(files.photo.path);
            patient.photo.contentType = files.photo.type;
        }

        patient.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR', err);
                return res.status(400).json({
                    error: "Cannot submit form."
                });
            }
            res.json(result);
        });
    });
}