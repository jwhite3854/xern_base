module.exports = app => {
    const sheets = require("../controllers/sheet.controllers.js");

    const router = require("express").Router();

    // Create a new Sheet
    router.post("/", sheets.create);

    // Retrieve all Sheets
    router.get("/", sheets.findAll);

    // Retrieve all active Sheets
    router.get("/active", sheets.findAllActive);

    // Retrieve a single Sheet with id
    router.get("/:id", sheets.findOne);

    // Update a Sheet with id
    router.put("/:id", sheets.update);

    // Delete a Sheet with id
    router.delete("/:id", sheets.delete);

    // Delete all Sheets
    router.delete("/", sheets.deleteAll);

    app.use('/api/sheets', router);
};