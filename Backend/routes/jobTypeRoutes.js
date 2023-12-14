const express = require('express');
const router = express.Router();
const jobTypeController = require('../controllers/jobTypeController');
const auth = require('../middleware/auth');


router.post('/type/create',auth.isAuthenticated, auth.isAdmin, jobTypeController.createJobType);
router.get('/type/jobs', jobTypeController.allJobType);
router.put('/type/update/:type_id', auth.isAuthenticated, auth.isAdmin, jobTypeController.updateJobType);
router.delete('/type/delete/:type_id', auth.isAuthenticated, auth.isAdmin, jobTypeController.updateJobType);

module.exports = router;