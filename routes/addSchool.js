const express = require('express');
const router = express.Router();
const db = require('../config/dbConn');

router.post('/', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).send('Invalid input. All fields are required.');
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        await db.query(query, [name, address, latitude, longitude]);
        res.status(201).send('School added successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error.');
    }
});

module.exports = router;
