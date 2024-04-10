const socket = io();

let user;
const chatBox = document.querySelector("#chatBox");
const messagesLogs = document.querySelector("#messagesLogs");

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa el usuario para identificarte",
    inputValidator: (value) => {
        return !value && "¡Necesitas identificarte para continuar!";
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit("usserConnect", user);
});


chatBox.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        if (chatBox.value.trim().length > 0) {

            socket.emit("message", {
                user,
                message: chatBox.value
            });

            chatBox.value = "";
        }
    }
});

socket.on("messagesLogs", data => {
    let messages = "";
    
    data.forEach(chat => {
        messages += `<div class="message"><span>${chat.user}</span>: <span>${chat.message}</span></div>`;
    });

    messagesLogs.innerHTML = messages;
});

socket.on("newUser", data => {
    
    Swal.fire({
        text: `${data} se ha unido al chat`,
        toast: true,
        position: "top-right"
    })
})
