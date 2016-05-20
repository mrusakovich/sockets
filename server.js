var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var clients = [];

app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
    clients.push(socket);
    socket.on("message", message => {
        socket.broadcast.emit("message", message);
    });
    socket.on("leave", user => {
        var i = clients.indexOf(socket);
        clients.splice(i, 1)
        socket.broadcast.emit("leave", user.text);
    });
    socket.on("entering", user => {
        socket.broadcast.emit("entering", user);
    });
});



http.listen(PORT, () => {
    console.log("Server started");
});