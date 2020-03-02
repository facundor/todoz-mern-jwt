const express = require("express");
const handleError = require("../middleware/error");
const morgan = require("morgan");
const auth = require("../middleware/auth");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const {swaggerSpecs, swaggerOptions} = require('./swagger');
const { connectDB } = require("./db");

connectDB();

const app = express();

// Use the middlewares
app.use(express.json({ extended: true }));
app.use(morgan("combined"));
app.use(cors());

// Create all the endpoints
app.use("/api/users", require("../routes/users"));
app.use("/api/auth", require("../routes/auth"));
app.use("/api/todoitems", auth(), require("../routes/todoitems"));

// Swagger config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, swaggerOptions));

// Error middleware
app.use(handleError);

module.exports = app;
