const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", ticketSchema);
