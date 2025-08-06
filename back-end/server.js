const express = require("express");
const cors = require("cors"); // <-- add this line
require('dotenv').config();
const createEntryRouter = require("./createEntry");

const app = express();
app.use(cors()); // <-- add this line
app.use(express.json());

app.use("/", createEntryRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});