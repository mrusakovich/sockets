var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log("User connected via socket.io");
    // socket.emit("message", {
    //     text: "Chatting started!"
    // });
    socket.on("message", (message) => {
        console.log(message);
        socket.broadcast.emit("message", message);
    });
});



http.listen(PORT, () => {
    console.log("Server started");
});