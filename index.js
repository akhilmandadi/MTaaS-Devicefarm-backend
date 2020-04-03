const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('tracer').colorConsole();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.REACT_URL, credentials: true }));
const connection = require('./db/connection');
const routes = require('./routes/routes');
const projectRoutes = require('./routes/project')

async function initializeApplication() {
    try {
        app.get('/health', (request, response) => {
            logger.debug('Health Check');
            response.json({
                message: 'Application Running',
            });
        });
        await connection.createConnection();
        app.use(routes);
        app.use(projectRoutes);

        app.listen(process.env.PORT || 8080, () => {
            logger.debug('App listening on port 8080');
        });
    } catch (error) {
        return Promise.reject(error.message);
    }
}

initializeApplication()
    .then((response) => logger.info("Server Running"))
    .catch(error => logger.error(`Error in Initalizing Application  : ${error}`));

module.exports = app;
