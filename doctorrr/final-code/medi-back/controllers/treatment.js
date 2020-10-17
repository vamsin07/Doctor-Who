const Treatment = require('../models/treatment');
const formidable = require('formidable');
const _ = require('lodash');

exports.submitUser = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to create Treatment."
            });
        }
        // check for all fields
        const { name, department } = fields;

        if (!name || !department) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let treatment = new Treatment(fields);

        treatment.save((err, treatment) => {
            if (err) {
                console.log("Unable to create Treatment.", err);
                return res.status(400).json({
                    error: "Unable to create Treatment."
                });
            }
            res.json(treatment);
        });
    });
};