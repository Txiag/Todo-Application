const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(PORT);
