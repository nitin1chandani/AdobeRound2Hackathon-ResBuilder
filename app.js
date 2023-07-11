const express = require("express");
const path = require("path");
const PORT = 5000;
const { createResume } = require("./createResume");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "Views") });
});
app.post("/resume", createResume);
app.listen(PORT, () => {
  console.log(`Server Listening At Port: ${PORT}`);
});
