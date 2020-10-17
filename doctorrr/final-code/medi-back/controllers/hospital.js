const Hospital = require('../models/hospital');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.hospitalById = (req, res, next, id) => {
    Hospital.findById(id)
        .populate('doctor')
        .populate('country')
        .populate('region')
        .exec((err, product) => {
            if (err || !hospital) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.hospital = hospital;
            next();
        });
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        const { name, region, country, hospital, address, facilities } = fields;

        if (!name || !region || !country || !hospital || !address || !facilities) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let hospital = new Hospital(fields);

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
}

exports.read = (req, res) => {
    req.hospital.photo1 = undefined;
    req.hospital.photo2 = undefined;
    req.hospital.photo3 = undefined;
    req.hospital.photo4 = undefined;
    req.hospital.photo5 = undefined;
    return res.json(req.hospital);
}

exports.photo = (req, res, next) => {
    if (req.hospital.photo1.data) {
        res.set('Content-Type', req.hospital.photo1.contentType);
        return res.send(req.hospital.photo1.data);
    }
    if (req.hospital.photo32.data) {
        res.set('Content-Type', req.hospital.photo2.contentType);
        return res.send(req.hospital.photo2.data);
    }
    if (req.hospital.photo3.data) {
        res.set('Content-Type', req.hospital.photo3.contentType);
        return res.send(req.hospital.photo3.data);
    }
    if (req.hospital.photo4.data) {
        res.set('Content-Type', req.hospital.photo4.contentType);
        return res.send(req.hospital.photo4.data);
    }
    if (req.hospital.photo5.data) {
        res.set('Content-Type', req.hospital.photo5.contentType);
        return res.send(req.hospital.photo5.data);
    }
    next();
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

        let hospital = req.hospital;
        hospital = _.extend(hospital, fields);

        if (files.photo1) {
            if (files.photo1.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size"
                });
            }
            hospital.photo1.data = fs.readFileSync(files.photo1.path);
            hospital.photo1.contentType = files.photo1.type;
        }

        if (files.photo2) {
            if (files.photo4.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size"
                });
            }
            hospital.photo2.data = fs.readFileSync(files.photo2.path);
            hospital.photo2.contentType = files.photo2.type;
        }

        if (files.photo3) {
            if (files.photo3.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size"
                });
            }
            hospital.photo3.data = fs.readFileSync(files.photo3.path);
            hospital.photo3.contentType = files.photo3.type;
        }

        if (files.photo4) {
            if (files.photo4.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size"
                });
            }
            hospital.photo4.data = fs.readFileSync(files.photo4.path);
            hospital.photo4.contentType = files.photo4.type;
        }

        if (files.photo5) {
            if (files.photo5.size > 10000000) {
                return res.status(400).json({
                    error: "Image should be less than 10MB in size"
                });
            }
            hospital.photo5.data = fs.readFileSync(files.photo5.path);
            hospital.photo5.contentType = files.photo5.type;
        }

        hospital.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
}

// by popularity = /products?sortBy=popularity&order=desc&limit=6

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Hospital.find()
        .select('-photo1')
        .select('-photo2')
        .select('-photo3')
        .select('-photo4')
        .select('-photo5')
        .populate('doctor')
        .populate('country')
        .populate('region')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, hospitals) => {
            if (err) {
                return res.status(400).json({
                    error: 'Hospitals not found'
                });
            }
            res.json(hospitals);
        });
};