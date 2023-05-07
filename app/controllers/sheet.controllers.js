const Sheet = require("../models/sheet.model.js");

// Create and Save a new Sheet
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Sheet
    const sheet = new Sheet({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    // Save Sheet in the database
    Sheet.create(sheet, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Sheets."
            });
        else res.send(data);
    });
};

// Retrieve all Sheets from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Sheet.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Sheets."
            });
        else res.send(data);
    });
};

// Find a single Sheet with a id
exports.findOne = (req, res) => {
    Sheet.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sheet with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sheet with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// find all published Sheets
exports.findAllActive = (req, res) => {
    Sheet.getAllActive((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Sheets."
            });
        else res.send(data);
    });
};

// Update a Sheet identified by the id in the request
exports.update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Sheet.updateById(
        req.params.id,
        new Sheet(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Sheet with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Sheet with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Sheet with the specified id in the request
exports.delete = (req, res) => {
    Sheet.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sheet with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Sheet with id " + req.params.id
                });
            }
        } else res.send({ message: `Sheet was deleted successfully!` });
    });
};

// Delete all Sheets from the database.
exports.deleteAll = (req, res) => {
    Sheet.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Sheets."
            });
        else res.send({ message: `All Sheets were deleted successfully!` });
    });
};