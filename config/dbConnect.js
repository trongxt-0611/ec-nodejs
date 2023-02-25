const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", true);
const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
