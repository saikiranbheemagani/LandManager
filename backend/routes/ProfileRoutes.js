//ProfileRoutes.js
const express = require('express');
const router = express.Router();
const authRoleMiddleware = require('../middlewares/authRoleMiddleware');
const ProfileController = require('../controllers/ProfileController')   

router.get("/",authRoleMiddleware(['ADM','MOD','CSM','LM']), ProfileController.getProfile);
router.put("/",authRoleMiddleware(['ADM','MOD','CSM','LM']),ProfileController.updateProfile);
router.delete("/",authRoleMiddleware(['ADM','MOD','CSM','LM']), ProfileController.deleteProfile);
router.get("/lm",authRoleMiddleware(['ADM','MOD','LM']), ProfileController.getLMProfiles);

module.exports =router;