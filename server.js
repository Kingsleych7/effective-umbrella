require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const sendMail = require("./mailer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI);

const Ticket = require("./models/Ticket");

app.post("/support", async (req, res) => {
  const { email, subject, message } = req.body;

  await Ticket.create({ email, subject, message });

  await sendMail(
    "support@summitlink.com",
    "New Support Ticket",
    `From: ${email}\n${message}`
  );

  res.send("Support request sent!");
});

app.listen(10000, () => console.log("Server running"));
