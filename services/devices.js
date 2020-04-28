let {OnDemandDevice} = require('./../db/schema/onDemandDevice');
let {PreBookDevice} = require('./../db/schema/preBookDevice');

module.exports.getAvailableOnDemandDevices = (req,resp) => {
  OnDemandDevice.find(req.query).then(devices => {
    resp.json({devices: devices})
  })
}
module.exports.createOnDemandDevice = (req,resp) => {
  let onDemandDevice = new OnDemandDevice(req.body); 
  onDemandDevice.save().then(_ => {
    resp.json({success: true})
  })
}

module.exports.getAvailablePreBookDevices = (req,resp) => {
  PreBookDevice.find(req.query).then(devices => {
    resp.json({devices: devices})
  })
}
module.exports.createPreBookDevice = (req,resp) => {
  let preBookDevice = new PreBookDevice(req.body); 
  preBookDevice.save().then(_ => {
    resp.json({success: true})
  })
}
