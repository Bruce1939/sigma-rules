const express = require('express');
const router = express.Router();

const requiresAuth = require('../middlewares/requireAuth');

const { 
    getRulesController, 
    addRuleController, 
    getAllRulesController,
    deleteRuleController,
    likeRuleController,
    unlikeRuleController,
    commentController,
    getSubRulesController
 } = require('../controllers/ruleControllers');

router.get('/getrules', requiresAuth, getRulesController);
router.post('/addrule', requiresAuth, addRuleController);
router.get('/getallrules', requiresAuth, getAllRulesController);
router.get('/getsubrules', requiresAuth, getSubRulesController);
router.delete('/deleterule/:ruleId', requiresAuth, deleteRuleController);
router.put('/like/:ruleId', requiresAuth, likeRuleController);
router.put('/unlike/:ruleId', requiresAuth, unlikeRuleController);
router.put('/comment/:ruleId', requiresAuth, commentController);


module.exports = router;