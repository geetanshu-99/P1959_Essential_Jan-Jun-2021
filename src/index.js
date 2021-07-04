const express = require("express");
const path = require("path");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;
const customerRouter = require("./routers/customer");

const publicDirectoryPath = path.join(__dirname, "../public");

app.use("/", express.static(publicDirectoryPath));

app.use(express.json());
app.use(customerRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
