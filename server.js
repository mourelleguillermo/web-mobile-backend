const express = require("express");
const bodyParser = require("body-parser"); // helps parse reqs and create req.body
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

// adds cors and body-parser as middlewares
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log("db synced");
  })
  .catch((err) => {
    console.log("couldnt sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

require("./app/routes/post.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
