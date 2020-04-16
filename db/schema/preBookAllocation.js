const mongoose = require('mongoose');
<<<<<<< HEAD
=======
let {PreBookDevice} = require('./preBookDevice')
>>>>>>> tmp

const PreBookAllocationSchema = new mongoose.Schema({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PreBookDevice'
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
  },
  ended: {
    type: Date,
    required: true,
  }
})

PreBookAllocationSchema.statics.allocateDevice = async function(data){
  let preBookDevice = await PreBookDevice.findById(data.device);
  if(!preBookDevice){
    throw new Error(`Device not present`);
  }
  let preBookAllocation = new this(data);
  await preBookAllocation.save().catch(e => {throw(e)});
  return preBookAllocation
}


module.exports.PreBookAllocation = mongoose.model.PreBookAllocation || mongoose.model('PreBookAllocation',PreBookAllocationSchema)