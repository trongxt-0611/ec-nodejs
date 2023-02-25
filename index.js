const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
app.use(bodyParser.urlencoded({extended: false}))

const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

//auth router
const authRoute = require("./routes/authRoute");
dbConnect();
app.use(bodyParser.json());

//api

app.use("/api/user", authRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
