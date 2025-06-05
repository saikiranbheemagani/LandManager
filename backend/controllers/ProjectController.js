const {nanoid} = require('nanoid');
const Asset = require('../models/AssetModel'); // Import your Asset model
const User = require('../models/UserModel'); // Import your Asset model
const Project = require('../models/ProjectModel'); // Import your Asset model
const Notif = require("../models/NotifModel");
const Comments = require("../models/CommentsModel");

async function createProjectRequest(req, res) {
    try {
      const user = req.user;
  
      const data = new Project({
        uid: nanoid(5),
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        user_id: user._id, // Use user._id to link the project to the user
        asset_id: req.body.assetID,
        startDate: Date.now(),
      });
  
      await data.save();
  
      // Update the asset to include the new project
      await Asset.findByIdAndUpdate(req.body.assetID, {
        $push: { projects: data._id },
      });
  
      const newNotif = new Notif({
        proj_id: data._id,
        proj_title: req.body.title,
        category: "request",
        sender: req.body.sender,
        user_id: user._id, // Use user._id to link the project to the user
      });
  
      await newNotif.save();
  
      return res.status(200).json({
        success: true,
        message: "Project Successfully Created",
        data,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
}

async function getProjects(req, res) {
  try {
    const user_id = req.query.user_id || req.user._id;
    const { project_id } = req.query;
    const user_role = req.user.role; // Assuming user's role is available in req.user
    // console.log(user_role)
    if (project_id) {
      let projectQuery = { _id: project_id, isActive: true };

      if (user_role === 'LM') {
        projectQuery.lm_id = user_id;
      } else if (user_role === 'CSM') {
        projectQuery.user_id = user_id;
      }
      // No additional filter for ADM

      const project = await Project.findOne(projectQuery);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Project retrieved successfully",
        project,
      });
    } else {
      let projectQuery = { isActive: true };

      if (user_role === 'LM') {
        projectQuery.lm_id = user_id;
      } else if (user_role === 'CSM') {
        projectQuery.user_id = user_id;
      }
      // No additional filter for ADM

      const projects = await Project.find(projectQuery);

      return res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        projects,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


async function addProject(req, res) {
  try {
    // const adminUser = req.user; // Assuming the authenticated user is an admin
    const { title, description, user_id, asset_id } = req.body;

    // Create a new project with initial status as "inprogress"
    const newProject = new Project({
      uid: nanoid(5),
      title,
      category: 'project', // Assuming the category is always 'project' for admin-created projects
      description,
      user_id, // The user to assign to the project
      asset_id,
      startDate: Date.now(),
      status: 'inprogress',
      // Add other properties as needed
    });

    await newProject.save();

    // Optionally, can perform additional actions, such as sending notifications

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

  
  async function closeProject(req, res) {
    try {
      const user = req.user;
      const { id } = req.body; // You can retrieve the project ID from the request body or query parameters, adjust as needed
  
      // Check if the project exists and belongs to the user
      const project = await Project.findOne({
        _id: id,
        user_id: user._id,
      });
  
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      // Update the project status to "closed"
      project.status = "closed";
      await project.save();
  
      return res.status(200).json({
        success: true,
        message: "Project closed successfully",
        project,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  async function getSpecificProject(req, res) {
    try {
      const project_id = req.body.project_id; // Retrieve the project ID from the request body
  
      // Find the project by ID
      const project = await Project.findOne({ _id: project_id });
  
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      // Find comments associated with the project and sort them by created_at in descending order
      const comments = await Comments.find({ proj_id: project_id }).sort({
        created_at: -1,
      });
  
      return res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        project,
        comments,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  
  async function getProjectRequests(req, res) {
    try {
      const user_id = req.user._id;
      const projects = await Project.find({ status: "open", isActive:true })
        .sort({ createdAt: -1 })
        .exec();
  
      return res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        count: projects.length,
        projects,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

async function updateProject(req, res) {
  try {
    const adminUser = req.user; // Assuming the authenticated user is an admin
    const projectIdToUpdate = req.query.projectId; // Assuming the project ID is in the URL parameters
    const updatedData = req.body;

    // console.log(projectIdToUpdate)
    // Find the project to update
    const projectToUpdate = await Project.findOne({
      _id: projectIdToUpdate,
    });

    if (!projectToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or user not authorized to update the project',
      });
    }

    // Update project details based on the provided data
    for (const field in updatedData) {
      if (Object.prototype.hasOwnProperty.call(updatedData, field)) {
        projectToUpdate[field] = updatedData[field];
      }
    }
    // console.log(updatedData)


    // Save the updated project
    await projectToUpdate.save();


    return res.status(200).json({
      success: true,
      message: 'Project details successfully updated',
      data: projectToUpdate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
  
  
  async function assignLM(req, res) {
    try {
      const { lm_id, lm_name, lm_phno, proj_id } = req.body;
  
      const updatedProject = await Project.findByIdAndUpdate(
        proj_id,
        { lm_id, lm_name, lm_phno },
        { new: true, runValidators: true }
      );
      
      if (!updatedProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      const user_id = updatedProject.user_id;
      const title = "Landmanager Assigned";
      const body = "Hello Land Owner, a Landmanager has been assigned to you. Click to view.";
      const imgUrl = "";
  
      const token = await User.findById(user_id).select('notifToken');
  
      if (!token) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // const result = await sendNotif([token.notifToken], title, body, imgUrl);
  
      return res.status(200).json({
        success: true,
        message: "Successfully updated",
        projects: updatedProject,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  async function updateProjectRequest(req, res) {
    try {
      const projectIdToUpdate = req.body.projectID;
      const newStatus = req.body.newStatus; // Assuming you receive the new status from the request body
  
      // Validate the new status to ensure it's one of the allowed values
      const allowedStatusValues = ["inprogress", "closed", "rejected"];
      if (!allowedStatusValues.includes(newStatus)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value. Allowed values are "inprogress", "closed", or "rejected".',
        });
      }
  
      // Find the project to update
      const projectToUpdate = await Project.findOne({
        _id: projectIdToUpdate,
      });
  
      if (!projectToUpdate) {
        return res.status(404).json({
          success: false,
          message: 'Project not found or user not authorized to update the project status',
        });
      }
  
      // Update the status of the project
      projectToUpdate.status = newStatus;
      await projectToUpdate.save();
  
      // Optionally, can perform additional actions, such as sending notifications
  
      return res.status(200).json({
        success: true,
        message: `Project status successfully updated to ${newStatus}`,
        data: projectToUpdate,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
  
  
async function cancelProjectRequest(req, res) {
  try {
    const projectIdToCancel = req.query.projectID;
    // console.log(projectIdToCancel)
    // Find the project to cancel
    const projectToCancel = await Project.findOne({
      _id: projectIdToCancel,
      user_id: req.user.id, // Ensure the user requesting cancellation is the project owner
    });

    if (!projectToCancel) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or user not authorized to cancel the project',
      });
    }

    // Mark the project as archived or inactive
    projectToCancel.isActive = false;
    await projectToCancel.save();

    // Optionally, you can also update the associated asset or perform additional actions

    return res.status(200).json({
      success: true,
      message: 'Project request successfully canceled and archived',
      data: projectToCancel,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

  
module.exports = {
    getProjects,
    addProject,
    updateProject,
    getProjectRequests,
    createProjectRequest,
    updateProjectRequest,
    cancelProjectRequest,
    closeProject,
    getSpecificProject,
    assignLM
}