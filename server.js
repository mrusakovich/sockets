var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
    socket.on("message", message => {
        socket.broadcast.emit("message", message);
    });
    socket.on("leave", user => {
        socket.broadcast.emit("leave", user.text);
    });
});



http.listen(PORT, () => {
    console.log("Server started");
});