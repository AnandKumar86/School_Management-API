const express = require('express');
const router = express.Router();
const db = require('../config/dbConn');
const geolib = require('geolib');

router.get('/', async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).send('User latitude and longitude are required.');
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    try {
        const query = 'SELECT * FROM schools';
        const [schools] = await db.query(query);

        const sortedSchools = schools.map(school => ({
            ...school,
            distance: geolib.getDistance(
                { latitude: userLat, longitude: userLon },
                { latitude: school.latitude, longitude: school.longitude }
            )
        })).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching schools.');
    }
});

module.exports = router;
