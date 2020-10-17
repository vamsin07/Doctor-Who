const Hospital = require('../models/hospital');
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
        const { name, region, country, hospital, address, facilities, photo1, photo2, photo3, photo4, photo5 } = fields;

        if (!name || !region || !country || !hospital || !address || !facilities || !photo1 || !photo2 || !photo3 || !photo4 || !photo5) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let hospital = new Hospital(fields);

        // 1kb = 1000
        // 10mb = 10000000

        if (files.photo1) {
            if (files.photo1.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size. Multiple images should be sent in a pdf format"
                });
            }
            hospital.photo1.data = fs.readFileSync(files.photo1.path);
            hospital.photo1.contentType = files.photo1.type;
        }

        if (files.photo2) {
            if (files.photo4.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size. Multiple images should be sent in a pdf format"
                });
            }
            hospital.photo2.data = fs.readFileSync(files.photo2.path);
            hospital.photo2.contentType = files.photo2.type;
        }

        if (files.photo3) {
            if (files.photo3.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size. Multiple images should be sent in a pdf format"
                });
            }
            hospital.photo3.data = fs.readFileSync(files.photo3.path);
            hospital.photo3.contentType = files.photo3.type;
        }

        if (files.photo4) {
            if (files.photo4.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size. Multiple images should be sent in a pdf format"
                });
            }
            hospital.photo4.data = fs.readFileSync(files.photo4.path);
            hospital.photo4.contentType = files.photo4.type;
        }

        if (files.photo5) {
            if (files.photo5.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size. Multiple images should be sent in a pdf format"
                });
            }
            hospital.photo5.data = fs.readFileSync(files.photo5.path);
            hospital.photo5.contentType = files.photo5.type;
        }

        hospital.save((err, result) => {
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