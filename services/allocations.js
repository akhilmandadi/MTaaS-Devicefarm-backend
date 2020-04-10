let {OnDemandAllocation} = require('./../db/schema/onDemandAllocation');

module.exports.getAllOnDemandAllocations = (req, resp) => {
  OnDemandAllocation.find(req.query || {})
    .populate('device')
    .populate('project')
    .then(allocations => {
      resp.json({allocations: allocations});
    })
}

module.exports.createOnDemandAllocation = (req, resp, next) => {
  req.body.devices.forEach(device =>{
    let data = {
      tester: req.body.tester,
      project: req.body.project,
      device: device
    }
    OnDemandAllocation.allocateDevice(data).then(_ => {
      resp.json({success: true});
    }).catch(e => next(e));
  })
}

module.exports.getOnDemandAllocation = (req, resp) => {
  OnDemandAllocation.findById(req.params.id).then(onDemandAllocation => {
    resp.json(onDemandAllocation);
  });
}

module.exports.onDemandDeallocate = (req, resp, next) => {
  OnDemandAllocation.deallocateDevice(req.params.id).then(_ => {
      resp.json({success: true});
  }).catch(e => next(e));
}
