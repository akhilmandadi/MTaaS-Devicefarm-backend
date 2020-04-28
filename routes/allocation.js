const express = require('express');
const router = express.Router();
const allocations = require('../services/allocations');

router.get('/ondemand', allocations.getAllOnDemandAllocations);
router.post('/ondemand', allocations.createOnDemandAllocation);
router.post('/ondemand/:id', allocations.getOnDemandAllocation);
router.post('/ondemand/:id/deallocate', allocations.onDemandDeallocate);

router.get('/prebook', allocations.getAllPreBookAllocations);
router.post('/prebook', allocations.createPreBookAllocation);
router.post('/prebook/:id', allocations.getPreBookAllocation);

module.exports = router;