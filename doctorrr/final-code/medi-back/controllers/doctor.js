const Doctor = require('../models/doctor');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const { name, department, qualification, hospital, specialisation, experience, education, achievements } = fields;

        if (!name || !department || !qualification || !hospital || !specialisation || !experience || !education || !achievements) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let doctor = new Doctor(fields);

        // 1kb = 1000
        // 10mb = 10000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size. Multiple images should be sent in a pdf format"
                });
            }
            doctor.photo.data = fs.readFileSync(files.photo.path);
            doctor.photo.contentType = files.photo.type;
        }

        doctor.save((err, result) => {
            if (err) {
                console.log("Cannot submit form.", err);
                return res.status(400).json({
                    error: "Cannot submit form."
                });
            }
            res.json(result);
        });
    });
};