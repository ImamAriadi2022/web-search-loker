require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const jobsRouter = require('./routes/jobs');
const applicantsRouter = require('./routes/applicants');

app.use('/api/jobs', jobsRouter);
app.use('/api/applicants', applicantsRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));