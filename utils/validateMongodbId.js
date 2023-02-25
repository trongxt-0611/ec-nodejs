const mongoose = require("mongoose");
const validateMongooseId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This is not a valid id");
  }
};

module.exports = { validateMongooseId };
