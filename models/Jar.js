const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JarSchema = new Schema({
  name: { type: String, required: true },
  typeOfJar: { type: String, required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: "PLN" },
  createDate: {
    type: Date,
    default: Date.now
  },
  splitIfEmpty: { type: Number },
  takeAllIfEmpty: { type: Number },
  history: [
    {
      typeOfOperation: { type: String, required: true },
      recipientId: { type: String },
      recipientName: { type: String },
      amount: { type: Number, required: true },
      description: { type: String },
      createDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Jar = mongoose.model("jar", JarSchema);
