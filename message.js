const { ipcRenderer } = require('electron');
const config = ipcRenderer.sendSync('getConfig', 'getConfig');

const messageButton = document.querySelector("#messageButton");
const usernameInput = document.querySelector("#username");
const messageInput = document.querySelector("#message");

messageButton.addEventListener('click', () => {
    ipcRenderer.send('messageUser', {
        usernames: usernameInput.value,
        message: messageInput.value
    });
})