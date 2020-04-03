const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const tester = require('../db/schema/tester').createModel();
const manager = require('../db/schema/manager').createModel();
const project = require('../db/schema/projects').createModel();
const operations = require('../db/operations');

const createProject = async (request, response) => {
    try {
        const { id } = request.params;
        request.body.managerId = id;
        const resp = await operations.saveDocuments(project, request.body, { runValidators: true })
        return response.status(200).json(resp);
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while creating project';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

const getProjects = async (request, response) => {
    try {
        const { id } = request.params;
        let resp = [];
        if (request.query.persona === "manager") {
            resp = await project.find({ managerId: id }, { __v: 0 }).lean().populate('testers.id', { name: 1, email: 1, _id: 1 });
        }
        if (request.query.persona === "tester") {
            resp = await project.find({ 'testers.id': id }, { __v: 0 }).lean().populate('managerId', { name: 1, email: 1, _id: 1 }).populate('testers.id', { name: 1, email: 1, _id: 1 });
        }
        return response.status(200).json(resp);
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching projects';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

const getProjectInfo = async (request, response) => {
    try {
        const { id } = request.params;
        let resp = [];
        resp = await project.find({ '_id': id }, { __v: 0 }).lean().populate('managerId', { name: 1, email: 1, _id: 1 }).populate('testers.id', { name: 1, email: 1, _id: 1 });
        return response.status(200).json(resp[0]);
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching projects';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

const getTestersOfAProject = async (request, response) => {
    try {
        const { id } = request.params;
        let res = [];
        if (_.isUndefined(request.query.isFree)) {
            let resp = await project.find({ '_id': id }, { __v: 0 }).populate('testers.id', { name: 1, email: 1, _id: 1 });
            resp[0]['testers'].map(tester => { res.push(tester.id) })
        }
        if (!_.isUndefined(request.query.list)) {
            let resp = await project.find({ '_id': id }, { __v: 0 }).populate('testers.id', { name: 1, email: 1, _id: 1 });
            res = resp[0]['testers']
        }
        if (!_.isUndefined(request.query.isFree)) {
            let resp = await project.find({ '_id': id }, { __v: 0 }).populate('testers.id', { name: 1, email: 1, _id: 1 });
            let ids = [];
            resp[0]['testers'].map(tester => { ids.push(tester.id._id) })
            res = await tester.find({ '_id': { '$nin': ids } }, { __v: 0, password: 0 })
        }
        return response.status(200).json(res);
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while fetching projects';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

const updateTestersForAProject = async (request, response) => {
    try {
        const { id } = request.params;
        let testerData = [];
        const testers = await operations.findDocumentsByQuery(project, { _id: id }, { testers: 1 })
        request.body.map(id => { testerData.push({ id }) })
        testerData = testerData.concat(testers[0]['testers'])
        await operations.updateField(project, id, { testers: testerData })
        return response.status(200).json(testerData);
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while creating project';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

const deleteTestersForAProject = async (request, response) => {
    try {
        const { id } = request.params;
        let testerData = [];
        const testers = await operations.findDocumentsByQuery(project, { _id: id }, { testers: 1 })
        console.log(JSON.stringify(testers))
        console.log(request.query.id)
        console.log(testers[0]['testers'])
        testers[0]['testers'].map(tester => {
            console.log(tester.id)
            console.log(request.query.id)
            console.log(_.isEqual(tester.id.toString(),request.query.id.toString()))
            if (!_.isEqual(tester.id.toString(),request.query.id.toString())) testerData.push({id:tester.id})
        })
        console.log(testerData)
        await operations.updateField(project, id, { testers: testerData })
        return response.status(200).json(testerData);
    } catch (ex) {
        logger.error(ex);
        const message = ex.message ? ex.message : 'Error while creating project';
        const code = ex.statusCode ? ex.statusCode : 500;
        return response.status(code).json({ message });
    }
};

module.exports.createProject = createProject;
module.exports.getProjects = getProjects;
module.exports.getProjectInfo = getProjectInfo;
module.exports.getTestersOfAProject = getTestersOfAProject;
module.exports.updateTestersForAProject = updateTestersForAProject;
module.exports.deleteTestersForAProject = deleteTestersForAProject;
