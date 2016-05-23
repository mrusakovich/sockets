define(function (require) {
    App(require("jquery"), require("io")(), require("moment"));
});

function App($, socket, moment) {

    var user = {};
    socket.on("connect", () => {
        console.log("Connected to socket.io server");
        var $form = $("#message-form");

        $form.on("submit", (event) => {
            event.preventDefault();
            socket.emit("message", {
                username: user.name,
                text: $form.find("input[name='message']").val()
            });
            $("#messages").append("<p>" + moment().format("DD-MM-YYYY HH:mm:ss") + " | you: " + $form.find("input[name='message']").val() + "</p>")
            $form.find("input[name='message']").val("");
        });
    });

    socket.on("message", (message) => {
        $("#messages").append("<p>" + message.time + " | " + message.username + " said: " + message.text + "</p>");
    });
    socket.on("leave", message => {
        $("#messages").append("<p>" + message + "</p>");
    });

    socket.on("entering", user => {
        $("#messages").append("<p>" + user.name + " entered chat." + "</p>");
    });

    window.onunload = () => {
        socket.emit("leave", {
            text: user.name + " just leaved chat."
        });
    };

    $("#name-form").on("submit", () => {
        event.preventDefault();
        if ($("#name").val().length > 0) {
            user.name = $("#name").val();
            socket.emit("entering", {
                name: user.name
            });
            $("#name-form").css("display", "none");
            $("#message-form").css("display", "block");
            $("#messages").css("display", "block");
        } else {
            return false;
        }
    });
}