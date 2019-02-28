const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JarSchema = new Schema({
  balance: { type: Number, default: 0 },
  currency: { type: String, default: "pl" },
  splitIfEmpty: { type: Number },
  takeAllIfEmpty: { type: Number },
  history: [
    {
      relJarId: { type: Number },
      date: {
        type: Date,
        default: Date.now
      },
      title: { type: String },
      amount: { type: Number },
      description: { type: String }
    }
  ]
});

module.exports = Jar = mongoose.model("jar", JarSchema);
