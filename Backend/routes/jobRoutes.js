const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');


router.post('/job/create', auth.isAuthenticated, auth.isAdmin, jobController.createJob);
router.get('/job/:id', jobController.singleJob);
router.put('/job/update/:id', auth.isAuthenticated, jobController.updateJob);
router.get('/job/show', jobController.showJobs);

module.exports = router;