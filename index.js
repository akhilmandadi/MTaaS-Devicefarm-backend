const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('tracer').colorConsole();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.REACT_URL, credentials: true }));

const routes = require('./routes/routes');

app.get('/health', (request, response) => {
    logger.debug('Health Check');
    response.json({
        message: 'Application Running',
    });
});

app.use(routes);

app.listen(process.env.PORT || 8080, () => {
    logger.debug('App listening on port 8080');
});

module.exports = app;
