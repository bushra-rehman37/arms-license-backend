const express = require('express')
const armController = {};
const { getDb, connectToDb } = require('../db/db')
let db
// db = getDb()
armController.addArm = async (req, res) => {
    db = await getDb()
    let obj = req.body;
    db.collection("arms").insertOne(obj, function(err, result) {
        if (err) res.status(500).json({error: 'Could not add the documents'});
        res.json({
            message : 'Added',
        })
    });
}
armController.getArm = async (req, res) => {
    db = await getDb()
    db.collection("arms").findOne({cnic:req.params.cnic}, function(err, result) {
        if (err) res.status(500).json({error: 'Could not fetch the documents'});
        res.json({
            message : 'Result',
            data:result
        })
    });
}
module.exports = armController;