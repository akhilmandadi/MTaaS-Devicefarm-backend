const mongoose = require('mongoose');

const PreBookAllocationSchema = new mongoose.Schema({
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PreBookDevice'
  },
  tester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tester'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
})

module.exports.PreBookAllocation = mongoose.model.PreBookAllocation || mongoose.model('PreBookAllocation',PreBookAllocationSchema)