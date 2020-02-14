const express = require("express");
const app = express();
const connectDB = require("./config/db");
const handleError = require("./middleware/error");
const morgan = require("morgan");
const auth = require("./middleware/auth");
const cors = require('cors');

connectDB();

const port = process.env.PORT || 5000;

// Use the middlewares
app.use(express.json({ extended: true }));
app.use(morgan("combined"));
app.use(cors());

// Create all the endpoints
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todoitems", auth(), require("./routes/todoitems"));

// Error middleware
app.use(handleError);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});