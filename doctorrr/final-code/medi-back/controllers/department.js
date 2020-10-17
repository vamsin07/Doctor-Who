const Department = require('../models/department');
const Doctor = require('../models/doctor');

exports.departmentById = (req, res, next, id) => {
    Department.findById(id).exec((err, department) => {
        if (err || !department) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.department = department;
        next();
    });
}

exports.create = (req, res) => {
    const department = new Department(req.body);
    department.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: "Unable to create Department." });
        }
        res.json({ data });
    });
}

exports.read = (req, res) => {
    return res.json(req.department);
}

exports.update = (req, res) => {
    const department = req.department;
    department.name = req.body.name;
    department.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to update details."
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const department = req.department;
    Doctor.find({ department }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${department.name}. It has ${data.length} associated products.`
            });
        } else {
            department.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Department deleted.'
                });
            });
        }
    });
};

exports.list = (req, res) => {
    Department.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ 
                error: "Unable to find the Departments." 
            });
        }
        res.json(data);
    });
}