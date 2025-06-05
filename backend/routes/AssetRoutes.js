//AssetRoutes.js
const express = require('express');
const router = express.Router();
const authRoleMiddleware = require('../middlewares/authRoleMiddleware');
const AssetController = require('../controllers/AssetController')   

router.get("/", authRoleMiddleware(['ADM','MOD','CSM', 'LM']),AssetController.getAssetsbyUser);
router.post("/", authRoleMiddleware(['ADM','MOD','CSM']),AssetController.addAsset);
router.put("/",authRoleMiddleware(['ADM','MOD','CSM']), AssetController.updateAsset);
router.delete("/", authRoleMiddleware(['ADM','MOD','CSM']),AssetController.removeAsset);

module.exports =router;
