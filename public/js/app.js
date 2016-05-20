var socket = io();

socket.on("connect", () => {
    console.log("Connected to socket.io server");
});

socket.on("message", (message) => {
    $("h3").text(message.text);
    console.log(message);
    console.log(message.text);
});