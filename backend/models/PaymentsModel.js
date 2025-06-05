var mongoose = require("mongoose");
var PaymentsSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    value:{type:String, default:"500 INR"},
    status:{type:String},
    paymentDate: { type: Date },
    orderId:{type: String},
    ExpiresIn :{type: String, default:"30 Days"}
},{ timestamps: true }
);

const myDB = mongoose.connection.useDb(`Landmanager-${process.env.envtype}`);
const Payments = myDB.model("Payments", PaymentsSchema);
module.exports = Payments;