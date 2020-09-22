const { ipcRenderer } = require('electron');
const config = ipcRenderer.sendSync('getConfig', 'getConfig');

const kickButton = document.querySelector("#kickButton");
const usernameInput = document.querySelector("#username");

kickButton.addEventListener('click', () => {
    ipcRenderer.send('kickUser', {
        usernames: usernameInput.value,
    });
})