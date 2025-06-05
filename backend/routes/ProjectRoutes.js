//AssetRoutes.js
const express = require('express');
const router = express.Router();
const authRoleMiddleware = require('../middlewares/authRoleMiddleware');
const ProjectController = require('../controllers/ProjectController')   
const CommentsController = require('../controllers/CommentsController')   


router.get("/", authRoleMiddleware(['ADM','MOD','CSM', 'LM']),ProjectController.getProjects);
router.post("/", authRoleMiddleware(['ADM','MOD', 'LM']),ProjectController.addProject);
router.put("/", authRoleMiddleware(['ADM','MOD', 'LM']),ProjectController.updateProject);
router.delete("/", authRoleMiddleware(['ADM','MOD', 'LM']),ProjectController.closeProject);
router.get("/requests/", authRoleMiddleware(['ADM','MOD','CSM','LM']),ProjectController.getProjectRequests);
router.post("/requests/", authRoleMiddleware(['ADM','MOD','CSM']),ProjectController.createProjectRequest);
router.put("/requests/", authRoleMiddleware(['ADM','MOD']),ProjectController.updateProjectRequest);
router.delete("/requests/", authRoleMiddleware(['ADM','MOD','CSM']),ProjectController.cancelProjectRequest);
router.put("/assign-lm/", authRoleMiddleware(['ADM','MOD']),ProjectController.assignLM);
router.get("/notifs", authRoleMiddleware(['ADM','MOD','CSM','LM']),CommentsController.getNotifs)
module.exports =router;