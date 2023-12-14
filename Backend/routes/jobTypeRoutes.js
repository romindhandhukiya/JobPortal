const express = require('express');
const router = express.Router();
const jobTypeController = require('../controllers/jobTypeController');
const auth = require('../middleware/auth');


router.post('/type/create',auth.isAuthenticated, jobTypeController.createJobType);
router.get('/type/jobs', jobTypeController.allJobType);

module.exports = router;