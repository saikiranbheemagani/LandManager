const express = require('express')
const compression = require('compression')
const cors = require('cors')
const credentials = require('./middlewares/credentials');
const corsOptions = require('./config/corsOptions');

var cookieParser = require("cookie-parser");
require("dotenv").config();

var apiResponse = require("./utils/apiResponse");


var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var ProfileRouter = require("./routes/ProfileRoutes");
var AssetRouter = require("./routes/AssetRoutes");
var ProjectRouter = require("./routes/ProjectRoutes");
var CommentRouter = require("./routes/CommentRoutes");
// var customerRouter = require("./routes/customer");
// var moderatorRouter = require("./routes/moderator");


const app = express()

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(compression())
app.enable("trust proxy");
app.use(cookieParser());
app.use(express.json())

// Index Router
app.use("/", indexRouter)
app.use('/auth/', authRouter);
app.use("/profile/", ProfileRouter);
app.use("/assets/", AssetRouter);
app.use("/projects/", ProjectRouter);
app.use("/comments/", CommentRouter);

// app.use("/moderator/", moderatorRouter);
// app.use("/customer/", customerRouter);
// app.use("/admin/", adminClientRouter);
// app.use("/auth-admin/", authRouter);
// app.use("/payment/", paymentRouter);


// throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});
app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;