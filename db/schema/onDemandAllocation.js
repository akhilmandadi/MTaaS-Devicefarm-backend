const mongoose = require('mongoose');
let {OnDemandDevice} = require('./onDemandDevice')

const OnDemandAllocationSchema = new mongoose.Schema({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OnDemandDevice'
  },
  tester: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'tester'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'projects'
  },
  started: {
    type: Date,
    required: true,
    default: Date.now
  },
  ended: {
    type: Date,
  }
})

OnDemandAllocationSchema.statics.allocateDevice = async function(data){
  let onDemandDevice = await OnDemandDevice.findById(data.device);
  if(!onDemandDevice || onDemandDevice.status !== 'available'){
    throw new Error(`Device already in use`);
  }
  let onDemandAllocation = new this(data);
  await onDemandAllocation.save().catch(e => {throw(e)});
  onDemandDevice.status = 'allocated';
  await onDemandDevice.save();
  return onDemandAllocation
}

OnDemandAllocationSchema.statics.deallocateDevice = async function(id){
  let onDemandAllocation = await this.findById(id);
  onDemandAllocation.ended = Date.now();
  let onDemandDevice = await OnDemandDevice.findById(onDemandAllocation.device);
  if(!onDemandDevice || onDemandDevice.status !== 'allocated'){
    throw new Error('Device is not allocated');
  }
  await onDemandAllocation.save();
  onDemandDevice.status = 'available';
  await onDemandDevice.save();
  return onDemandAllocation
}


module.exports.OnDemandAllocation = mongoose.model.OnDemandAllocation || mongoose.model('OnDemandAllocation',OnDemandAllocationSchema)