const mongoose = require('mongoose')
const app = require('./index');
const port = process.env.PORT || 3000;
require("dotenv").config();
let server;

const mongoURL = process.env.MONGO_URL
const connectWithRetry = () =>{
mongoose
    .connect(mongoURL)
    .then(()=> {
        server_status = 'online'
        
        console.log("Successfully connected to DB")})
    .catch((e)=> {
        console.log(e)
        server_status = 'offline'
        setTimeout(connectWithRetry, 5000)
    })
}
const startServer = () => {
    const port = process.env.PORT || 3000;
    server = app.listen(port, () => console.log(`Listening on port ${port}`));
  };
connectWithRetry()

module.exports = { app, startServer, server };
