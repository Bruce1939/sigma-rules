const express = require('express');
const router = express.Router();

const requiresAuth = require('../middlewares/requireAuth');
const { 
    userProfileController, 
    followUserController, 
    unfollowUserController
} = require('../controllers/userControllers');

router.get('/:id', requiresAuth, userProfileController);
router.put('/follow/:userId', requiresAuth, followUserController);
router.put('/unfollow/:userId', requiresAuth, unfollowUserController);

module.exports = router;