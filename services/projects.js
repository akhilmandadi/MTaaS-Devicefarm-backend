const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })

const devicefarm = new AWS.DeviceFarm({
    apiVersion: '2015-06-23',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION
});

const getProjects = async (request, response) => {
    try {
        const params = {
        };
        const projects = await devicefarm.listProjects(params).promise();
        return response.json(projects).status(200);
    } catch (ex) {
        logger.error(JSON.stringify(ex));
        const message = ex.message ? ex.message : 'Error while fetching project details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

module.exports.getProjects = getProjects;
