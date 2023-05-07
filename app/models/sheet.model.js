const sql = require("./db.js");

// constructor
const Sheet = function(sheet) {
    this.title      = sheet.title;
    this.is_active  = sheet.is_active;
};

Sheet.create = (newSheet, result) => {
    sql.query("INSERT INTO sheets SET ?", newSheet, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created sheet: ", { id: res.insertId, ...newSheet });
        result(null, { id: res.insertId, ...newSheet });
    });
};

Sheet.findById = (id, result) => {
    sql.query(`SELECT * FROM sheets WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found sheet: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Sheet with the id
        result({ kind: "not_found" }, null);
    });
};

Sheet.getAll = (title, result) => {
    let query = "SELECT * FROM sheets";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("sheets: ", res);
        result(null, res);
    });
};

Sheet.getAllActive = result => {
    sql.query("SELECT * FROM sheets WHERE is_active = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("sheets: ", res);
        result(null, res);
    });
};

Sheet.updateById = (id, sheet, result) => {
    sql.query(
        "UPDATE sheets SET title = ?, is_active = ? WHERE id = ?",
        [sheet.title, sheet.is_active, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Sheet with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated sheet: ", { id: id, ...sheet });
            result(null, { id: id, ...sheet });
        }
    );
};

Sheet.remove = (id, result) => {
    sql.query("DELETE FROM sheets WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Sheet with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted sheet with id: ", id);
        result(null, res);
    });
};

Sheet.removeAll = result => {
    sql.query("DELETE FROM sheets", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} sheets`);
        result(null, res);
    });
};

module.exports = Sheet;