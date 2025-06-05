var mongoose = require("mongoose");
var CommentsSchema = new mongoose.Schema({
    content: { 
        text: {type: String},
        media: [{ type: String }],
    },
    proj_id: {type: mongoose.Schema.ObjectId, ref: "Projects"},
    sender: { type: String, enum: ["CSM", "ADM", "MOD", "LM"], default: "CSM"},
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    created_at:  {type: Date, default: Date.now},
});

const myDB = mongoose.connection.useDb(`Landmanager-${process.env.envtype}`);
const Comments = myDB.model("Comments", CommentsSchema);
module.exports = Comments;