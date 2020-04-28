const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })

const devicefarm = new AWS.DeviceFarm({
    apiVersion: '2015-06-23',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION
});

const createDevicePool = async (request, response) => {
    try {
        let arn = JSON.stringify(["arn:aws:devicefarm:us-west-2::device:AC0E9432D47E494987918B7268694947"])
        const params = {
            "description": "My-Pool",
            "name": "My-Pool",
            "projectArn": "arn:aws:devicefarm:us-west-2:915431243571:project:ede20088-7c9e-44a6-9543-6d2bf63cf46a",
            "rules": [
                {
                    "attribute": "ARN",
                    "operator": "IN",
                    "value": JSON.stringify(["arn:aws:devicefarm:us-west-2::device:AC0E9432D47E494987918B7268694947"])
                }
            ]
        }
        const projects = await devicefarm.createDevicePool(params).promise();
        return response.json(projects).status(200);
        // {
        //     "devicePool": {
        //         "arn": "arn:aws:devicefarm:us-west-2:915431243571:devicepool:ede20088-7c9e-44a6-9543-6d2bf63cf46a/c1071c1d-dacc-4b4c-a89c-4c39e48ba0bd",
        //         "name": "My-Pool",
        //         "description": "My-Pool",
        //         "type": "PRIVATE",
        //         "rules": [
        //             {
        //                 "attribute": "ARN",
        //                 "operator": "IN",
        //                 "value": "[\"arn:aws:devicefarm:us-west-2::device:AC0E9432D47E494987918B7268694947\"]"
        //             }
        //         ]
        //     }
        // }
    } catch (ex) {
        logger.error(JSON.stringify(ex));
        const message = ex.message ? ex.message : 'Error while fetching project details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

const getDevices = async (request, response) => {
    try {
        const params = {
            filters: [
                {
                    "attribute": "AVAILABILITY",
                    "operator": "EQUALS",
                    "values": ["HIGHLY_AVAILABLE"]
                }
            ]
        }
        const projects = await devicefarm.listDevices(params).promise();
        return response.json(projects).status(200);
    } catch (ex) {
        logger.error(JSON.stringify(ex));
        const message = ex.message ? ex.message : 'Error while fetching project details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

const getDeviceFarmProjects = async (request, response) => {
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

const getUploads = async (request, response) => {
    try {
        // const params = {
        //     "arn": "arn:aws:devicefarm:us-west-2:915431243571:project:ede20088-7c9e-44a6-9543-6d2bf63cf46a",
        //     "type": "ANDROID_APP"
        // };
        const params = {
            "arn": "arn:aws:devicefarm:us-west-2:915431243571:project:ede20088-7c9e-44a6-9543-6d2bf63cf46a",
            "type": "APPIUM_JAVA_TESTNG_TEST_PACKAGE"
        };
        const projects = await devicefarm.listUploads(params).promise();
        return response.json(projects).status(200);
    } catch (ex) {
        logger.error(JSON.stringify(ex));
        const message = ex.message ? ex.message : 'Error while fetching project details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};
const getRuns = async (request, response) => {
    try {
        const params = {
            "arn": "arn:aws:devicefarm:us-west-2:915431243571:project:ede20088-7c9e-44a6-9543-6d2bf63cf46a",
        };
        const projects = await devicefarm.listRuns(params).promise();
        return response.json(projects).status(200);
    } catch (ex) {
        logger.error(JSON.stringify(ex));
        const message = ex.message ? ex.message : 'Error while fetching project details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};
const getRun = async (request, response) => {
    try {
        const params = {
            "arn": "arn:aws:devicefarm:us-west-2:915431243571:run:ede20088-7c9e-44a6-9543-6d2bf63cf46a/47db2a14-cb72-4966-9d39-ff2ef20d89b3",
        };
        const projects = await devicefarm.listRuns(params).promise();
        return response.json(projects).status(200);
    } catch (ex) {
        logger.error(JSON.stringify(ex));
        const message = ex.message ? ex.message : 'Error while fetching project details';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};
module.exports.getRun = getRun;
module.exports.getRuns = getRuns;
module.exports.getUploads = getUploads;
module.exports.getDeviceFarmProjects = getDeviceFarmProjects;
module.exports.getDevices = getDevices;
module.exports.createDevicePool = createDevicePool;