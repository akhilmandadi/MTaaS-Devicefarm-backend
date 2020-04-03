const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const uuid = require('shortid');
const tester = require('../db/schema/tester').createModel();
const manager = require('../db/schema/manager').createModel();
const operations = require('../db/operations');

const signin = async (request, response) => {
    try {
        const { email } = request.query;
        const { persona } = request.query;
        const model = (persona === "tester" ? tester : manager)
        const resp = await operations.findDocumentsByQuery(model, { email }, { __v: 0 });
        if (_.isEmpty(resp)) {
            throw createError(401, 'Invalid Credentials');
        }
        resp[0]['persona'] = persona;
        return response.status(200).json(resp[0]);
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching credentials';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

const signup = async (request, response) => {
    try {
        const { entity, email, password, name } = request.body;
        const data = {
            name, email, password
        };
        if (request.query.persona === 'tester') {
            const resp = await operations.findDocumentsByQuery(tester, { email }, { _id: 0, __v: 0 })
            if (resp.length === 1) {
                throw createError(409, 'Email Id already registered. Try logging in');
            }
            await operations.saveDocuments(tester, data, { runValidators: true })
        }
        if (request.query.persona === 'manager') {
            const resp = await operations.findDocumentsByQuery(manager, { email }, { _id: 0, __v: 0 })
            if (resp.length === 1) {
                throw createError(409, 'Email Id already registered. Try logging in');
            }
            await operations.saveDocuments(manager, data, { runValidators: true })
        }
        return response.status(200).json({ message: 'Signup Successful' });
    } catch (error) {
        logger.error(JSON.stringify(error));
        const message = error.message ? error.message : 'Error Ocurred at Server';
        const code = error.statusCode ? error.statusCode : 500;
        return response.status(code).json({ message }).status(code);
    }
};

module.exports.signin = signin;
module.exports.signup = signup;