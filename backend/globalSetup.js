const mongoose = require('mongoose');
const { app } = require('./local2'); // Ensure this path is correct

module.exports = async () => {
  // Connect to the database
  const mongoURL = process.env.MONGO_URL;
  await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

  // Start the server on a specific port
  global.httpServer = app.listen(3000);
};
