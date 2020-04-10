const express = require('express');
const router = express.Router();
const allocations = require('../services/allocations');

router.get('/ondemand', allocations.getAllOnDemandAllocations);
router.post('/ondemand', allocations.createOnDemandAllocation);
router.post('/ondemand/:id', allocations.getOnDemandAllocation);
router.post('/ondemand/:id/deallocate', allocations.onDemandDeallocate);

module.exports = router;