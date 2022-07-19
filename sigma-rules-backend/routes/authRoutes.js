const express = require('express');
const router = express.Router();

const requiresAuth = require('../middlewares/requireAuth');

const { 
    signUpController, 
    logInController, 
    getCurrentUserController,
 } = require('../controllers/authControllers');

router.post('/signup', signUpController);
router.post('/login', logInController);
router.get('/currentuser', getCurrentUserController);


module.exports = router;