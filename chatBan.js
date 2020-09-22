const { ipcRenderer } = require('electron');
const config = ipcRenderer.sendSync('getConfig', 'getConfig');

const chatBanButton = document.querySelector("#chatBanButton");
const usernameInput = document.querySelector("#username");
const timeInput = document.querySelector("#time");
const reasonInput = document.querySelector("#reason");

chatBanButton.addEventListener('click', () => {
    ipcRenderer.send('chatBanUser', {
        usernames: usernameInput.value,
        time: parseInt(timeInput.value) ? parseInt(timeInput.value) : 0,
        reason: reasonInput.value,
    });
})