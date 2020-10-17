const Doctor = require('../models/doctor');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.doctorById = (req, res, next, id) => {
    Doctor.findById(id)
        .populate('department')
        .populate('hospital')
        .populate('specialisation')
        .populate('region')
        .populate('country')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.doctor = doctor;
            next();
        });
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        const { name, department, qualification, hospital, specialisation, experience, education, achievements } = fields;

        if (!name || !department || !qualification || !hospital || !specialisation || !experience || !education || !achievements) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let doctor = new Doctor(fields);


        if (files.photo) {
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
}

exports.read = (req, res) => {
    req.doctor.photo = undefined;
    return res.json(req.doctor);
}

exports.remove = (req, res) => {
    let doctor = req.doctor;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Doctor deleted successfully'
        });
    });
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let doctor = req.doctor;
        doctor = _.extend(doctor, fields);

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 10MB in size'
                });
            }
           doctor.photo.data = fs.readFileSync(files.photo.path);
           doctor.photo.contentType = files.photo.type;
        }

        doctor.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
}

// by sell = /doctors?sortBy=popularity&order=desc&limit=6

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select('-photo')
        .populate('department')
        .populate('hospital')
        .populate('specialisation')
        .populate('region')
        .populate('country')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, doctors) => {
            if (err) {
                return res.status(400).json({
                    error: 'Doctors not found'
                });
            }
            res.json(doctors);
        });
};
