const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JarSchema = new Schema({
  name: { type: String, required: true },
  typeOfJar: { type: String, required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: "pl" },
  createDate: {
    type: Date,
    default: Date.now
  },
  splitIfEmpty: { type: Number },
  takeAllIfEmpty: { type: Number },
  history: [
    {
      typeOfOperation: { type: String, required: true },
      jarId: { type: Number },
      createDate: {
        type: Date,
        default: Date.now
      },
      amount: { type: Number, required: true },
      description: { type: String }
    }
  ]
});

module.exports = Jar = mongoose.model("jar", JarSchema);
