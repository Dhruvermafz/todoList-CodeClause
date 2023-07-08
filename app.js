const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./configs/keys");
require("dotenv").config();
// Import Routes files
const todoRoutes = require("./routes/todos");

// Express settings and middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/todos", todoRoutes);

// Deploy with client sides
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Deal with "DeprecationWarning: collection.ensureIndex is deprecated."
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.on("connected", () => console.log(`Database connected`));
mongoose.connection.on("disconnected", () =>
  console.log(`Database disconnected`)
);
mongoose.connection.on("error", (err) =>
  console.log(`Database connect with error: ${err.message}`)
);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Todo List server listening on PORT ${PORT}`);
});
