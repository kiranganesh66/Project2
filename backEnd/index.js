const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

// Database connection
mongoose.connect("mongodb://localhost:27017/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model
const User = mongoose.model("User", { username: String });

// Socket connections
io.on("connection", (socket) => {
  // Handle user joining, messaging, etc. using socket events and database operations

  socket.on("join", (username) => {
    const user = new User({ username });
    user.save((err) => {
      if (err) {
        // Handle error
      } else {
        // Emit user list to all connected clients
        io.emit("users", users);
      }
    });
  });

  socket.on("message", (message) => {
    // Store message in database and emit to all connected clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    // Remove user from database and update user list
  });
});

// Start server
http.listen(3000, () => console.log("Server listening on port 3000"));
