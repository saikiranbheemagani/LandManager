var mongoose = require("mongoose");

var AssetSchema = new mongoose.Schema(
  {
    name: { type: String, },
    description: { type: String, },
    location: {
      city: { type: String, },
      district: { type: String, },
      pincode: { type: String, },
      surveycode: { type: String, },
      landmarks: { type: String },
      locationLink: { type: String },
    },
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    media: [{ type: String }],
    projects:[{ type: mongoose.Schema.ObjectId, ref: "Projects",}],
    subscriptionPlan: { type: Boolean, default: false},
    planExpiry: { type: Date},
  },
  { timestamps: true }
);

const myDB = mongoose.connection.useDb(`Landmanager-${process.env.envtype}`);
const Assets = myDB.model("Assets", AssetSchema);
module.exports = Assets;
