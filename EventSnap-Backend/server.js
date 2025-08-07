require("dotenv").config();
const express = require("express");
require("./config/database");
const eventRoutes = require("./routes/event.routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/events", eventRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
