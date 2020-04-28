require('dotenv').config();
const formidable = require('formidable');
const logger = require('tracer').colorConsole();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' })

const devicefarm = new AWS.DeviceFarm({
    apiVersion: '2015-06-23',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION
});

const getRemoteAccessSession = async (sessionArn) => {
  var params = {
    arn: sessionArn
  };
  return await new Promise((resolve, _) => {
    devicefarm.getRemoteAccessSession(params, function(err, data) {
        resolve({
            err: err,
            data: data
        })
      });
  });
}

const getRemoteAccessSessionWhenReady = async (remoteResp) => {
    if(remoteResp.data && remoteResp.data.remoteAccessSession.status !== 'RUNNING'){
        await sleep(1000);
        remoteResp = await getRemoteAccessSessionWhenReady(await getRemoteAccessSession(remoteResp.data.remoteAccessSession.arn))
    }
    return remoteResp;
  }

const triggerCreateRemoteAccessSession = async (sessionData) => {
  var params = {
    name: sessionData.name, 
    configuration: {
     billingMethod: "METERED"
    }, 
    deviceArn: sessionData.deviceArn,
    projectArn: process.env.DEVICE_FARM_PROJECT_ARN// You can get the project ARN by using the list-projects CLI command.
   };
   return await new Promise((resolve, _) => {
    devicefarm.createRemoteAccessSession(params, function(err, data) {
        resolve({
            err: err,
            data: data
        })
    });
  });
}

const createRemoteAccessSession = async (sessionData) => {
    const {err, data} =  await triggerCreateRemoteAccessSession(sessionData);
    if(err){
        return {err: err, data: null}
    }
    const sessionArn = data.remoteAccessSession.arn;
    return await getRemoteAccessSessionWhenReady(await getRemoteAccessSession(sessionArn))
}


const stopRemoteAccessSession = async (sessionArn) => {
  var params = {
    arn: sessionArn
  };
  return await new Promise((resolve, _) => {
    devicefarm.stopRemoteAccessSession(params, function(err, data) {
        resolve({
            err: err,
            data: data
        });
    });
  });
}

module.exports.createRemoteAccessSession = createRemoteAccessSession;
module.exports.getRemoteAccessSession = getRemoteAccessSession;
module.exports.getRemoteAccessSessionWhenReady = getRemoteAccessSessionWhenReady;
module.exports.stopRemoteAccessSession = stopRemoteAccessSession;
