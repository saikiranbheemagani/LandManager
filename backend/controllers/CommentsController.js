const Comments = require("../models/CommentsModel");
const Notifs = require("../models/NotifModel");


async function getComments(req,res) {
try {

    const {project_id} = req.query;
    const comments = await Comments.find({ proj_id: project_id }).sort({
        created_at: -1,
      });
      
      // console.log(comments)
    return res.status(200).json({
        success: true,
        comments,
        message: "Data retrieved successfully",
    });
} catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function postComments(req,res){
try {
    const {proj_id, proj_title,content, sender, notifToken} = req.body;
    const newComment = new Comments({
      content: content,
      proj_id: proj_id,
      sender: sender,
      user_id: req.user.id
    }) 
    await newComment.save()
    const newNotif = new Notifs({
      proj_id: proj_id,
      proj_title:proj_title,
      category: "message",
      sender: sender,
      user_id: req.user.id
    });
    await newNotif.save();

    //Send Auto Notifications to Customer on App
    // if(sender ==="ADM"||sender ==="MOD"){
    //   const title = "Update on your Land"
    //   const Body = "Hello Land Owner, There are updates for your project. Click to view."
    //   const imgUrl = ""
    //   // const token = await User.findById(user_id).select('notifToken')
    //   await sendNotif(notifToken, title, Body, imgUrl)
    // }

    return res.status(200).json({
      success: true,
      message: "Comments updated successfully",
    });

} catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}
}

async function getNotifs(req, res) {
  try {
    // Get the user ID from the request (assuming it's available in req.user)
    const userId = req.user.id;

    // Fetch all notifications for the given user and sort by timestamp in descending order
    const notifications = await Notifs.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
    getComments,
    postComments,
    getNotifs
  };