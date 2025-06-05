const User = require("../models/UserModel");

async function getProfile(req, res) {
  try {
    const useId = req.user.id || req.query.id;
    const data = await User.find({_id: useId});

    return res.status(200).json({
      success: true,
      message: "User Data retrieved successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
async function getLMProfiles(req, res) {
  try {
    // const useId = req.user.id || req.query.id;
    const data = await User.find({role:"LM"});

    return res.status(200).json({
      success: true,
      message: "LM Data retrieved successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function updateProfile(req, res) {
  try {
    const user_id = req.body._id;
    const data = await User.findOneAndUpdate({
      _id:user_id,
    }, req.body,{
      new:true,
      runValidators:true
  });

    return res.status(200).json({
      success: true,
      message: "User Data Updated successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function deleteProfile(req, res) {
  try {
    const userId = req.user.id;
    const data = await User.deleteOne({_id: userId});

    return res.status(200).json({
      success: true,
      message: "User Profile deleted successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
  getLMProfiles
};
