var socket = io();

socket.on("connect", () => {
    console.log("Connected to socket.io server");
    var $form = $("#message-form");

    $form.on("submit", (event) => {
        event.preventDefault();
        socket.emit("message", {
            text: $form.find("input[name='message']").val()
        });
        $("#messages").append("<p>me: "+ $form.find("input[name='message']").val() +"</p>")
        $form.find("input[name='message']").val("");
    });
});

socket.on("message", (message) => {
    $("#messages").append("<p> him: "+ message.text +"</p>");
});
socket.on("leave", message => {
    $("#messages").append("<p>"+ message +"</p>");
});
window.onunload = () => {
    socket.emit("leave", {
        text: "he just leaved chat."
    });
};