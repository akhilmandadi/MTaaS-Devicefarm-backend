let {OnDemandDevice} = require('./../db/schema/onDemandDevice');

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
