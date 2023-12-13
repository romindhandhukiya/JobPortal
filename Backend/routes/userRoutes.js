const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');


router.get('/allusers',auth.isAuthenticated, auth.isAdmin, userController.allUsers);
router.get('/user/:id',auth.isAuthenticated, userController.singleUser);
router.post('/user/edit/:id',auth.isAuthenticated, userController.editUser);
router.delete('/user/edit/:id',auth.isAuthenticated, auth.isAdmin, userController.deleteUser);

module.exports = router;