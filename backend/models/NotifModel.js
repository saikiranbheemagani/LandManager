var mongoose = require("mongoose");
var NotifsSchema = new mongoose.Schema(
  {
    proj_id: { type: String },
    proj_title: { type: String },
    category: {type: String,  enum: ["message","request"], default: "message"},
    sender: { type: String, enum: ["CSM", "ADM", "MOD", "LM"], default: "CSM"},
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    seen:{  type: Boolean, default: false }
  },
  { timestamps: true }
);

const myDB = mongoose.connection.useDb(`Landmanager-${process.env.envtype}`);
const Notifs = myDB.model("Notifs", NotifsSchema);
module.exports = Notifs;