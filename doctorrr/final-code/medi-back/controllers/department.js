const Department = require('../models/department');

exports.create = (req, res) => {
    const department = new Department(req.body);
    department.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: "Unable to create Department." });
        }
        res.json({ data });
    });
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ error: "Unable to find the Departments." });
        }
        res.json(data);
    });
}