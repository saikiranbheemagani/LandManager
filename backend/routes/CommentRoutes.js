//CommentsRoutes.js
const express = require('express');
const router = express.Router();
const authRoleMiddleware = require('../middlewares/authRoleMiddleware');
const CommentsController = require('../controllers/CommentsController')   

router.get("/", authRoleMiddleware(['ADM','MOD','CSM', 'LM']),CommentsController.getComments);
router.post("/", authRoleMiddleware(['ADM','MOD', 'CSM','LM']),CommentsController.postComments);

module.exports =router;