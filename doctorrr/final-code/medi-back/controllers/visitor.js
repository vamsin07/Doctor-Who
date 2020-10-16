const Visitor = require('../models/visitor');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.submitVisitor = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to submit form."
            });
        }
        // check for all fields
        const { name, email, contact, description } = fields;

        if (!name || !email || !contact || !description) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let visitor = new Visitor(fields);
        visitor.save((err, result) => {
            if (err) {
                console.log("Unable to submit form.", err);
                return res.status(400).json({
                    error: "Unable to submit form."
                });
            }
            res.json(result);
        });
    });
}