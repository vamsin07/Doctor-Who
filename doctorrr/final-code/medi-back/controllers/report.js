const Report = require('../models/report');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        const { name } = fields;

        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        }

        let report = new Report(fields);

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 10MB in size. Multiple images should be sent in a pdf format'
                });
            }
            report.photo.data = fs.readFileSync(files.photo.path);
            report.photo.contentType = files.photo.type;
        }

        report.save((err, result) => {
            if (err) {
                console.log('REPORT CREATE ERROR', err);
                return res.status(400).json({
                    error: "Cannot add report."
                });
            }
            res.json(result);
        });
    });
}

// we will be sending photo and the details separately for faster response

exports.read = (req, res) => {
    req.report.photo = undefined;
    return res.json(req.report);
}

exports.photo = (req, res, next) => {
    if (req.report.photo.data) {
        res.set('Content-Type', req.report.photo.contentType);
        return res.send(req.report.photo.data);
    }
    next();
}

exports.remove = (req, res) => {
    let report = req.report;
    report.remove((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
}