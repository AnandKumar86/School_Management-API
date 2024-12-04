const express = require('express');
const bodyParser = require('body-parser');
const addSchoolRoutes = require('./routes/addSchool');
const listSchoolsRoutes = require('./routes/listSchools');

const app = express();
app.use(bodyParser.json());

app.use('/addSchool', addSchoolRoutes);
app.use('/listSchools', listSchoolsRoutes);

const serverless = require('serverless-http');
module.exports = serverless(app);
