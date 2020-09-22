const { ipcRenderer } = require('electron');
const config = ipcRenderer.sendSync('getConfig', 'getConfig');

const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");

const teleportButton = document.querySelector("#teleportButton");
const messageButton = document.querySelector("#messageButton");
const chatBanButton = document.querySelector("#chatBanButton");
const kickButton = document.querySelector("#kickButton");

const monsterButton = document.querySelector("#monsterButton");
const announceButton = document.querySelector("#announceButton");

const otherCommunitiesDiv = document.querySelector("#otherCommunities");
const loginDiv = document.querySelector("#loginSection");

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

let selectedCommunity = config.communities[0];

const reloadInputs = () => {
    const { defaultName, defaultPassword } = selectedCommunity;
    if (defaultName) {
        usernameInput.setAttribute("value", defaultName);
    }
    else {
        usernameInput.setAttribute("value", "");
    }

    if (defaultPassword) {
        passwordInput.setAttribute("value", defaultPassword);
    }
    else {
        passwordInput.setAttribute("value", "");
    }
}
reloadInputs();

// Other communities section
if (config.communities.length > 1) {
    loginDiv.classList.add("pb-4");

    let select = document.createElement("select");
    select.classList.add("form-control");

    config.communities.forEach((community, index) => {
        const { name } = community;

        let option = document.createElement("option");
        option.setAttribute("value", index);
        option.innerHTML = name;

        select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
        selectedCommunity = config.communities[e.target.value];
        reloadInputs();
    });

    otherCommunitiesDiv.appendChild(select);
}
else {
    loginDiv.classList.add("pb-5");
}

loginButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log({ username, password, ip: selectedCommunity.ip, port: selectedCommunity.port });
    ipcRenderer.send('loginUser', { username, password, ip: selectedCommunity.ip, port: selectedCommunity.port });
    loginButton.setAttribute("disabled", "true");
    loginButton.classList.add("btn-light");
    loginButton.classList.remove("btn-success");
    loginButton.innerHTML = "Připojuji";
});

teleportButton.addEventListener("click", () => {
    ipcRenderer.send('openTeleport');
});

messageButton.addEventListener("click", () => {
    ipcRenderer.send('openMessage');
});

kickButton.addEventListener("click", () => {
    ipcRenderer.send('openKick');
});

chatBanButton.addEventListener("click", () => {
    ipcRenderer.send('openChatBan');
});

logoutButton.addEventListener("click", () => {
    ipcRenderer.send('logoutUser');
    loginButton.removeAttribute("disabled");
    loginButton.innerHTML = "Připojit";
    loginButton.classList.remove("btn-light");
    loginButton.classList.add("btn-success");
});

ipcRenderer.on('authorityChange', (event, authority) => {
    if (authority == 5) {
        monsterButton.removeAttribute("disabled");
        announceButton.removeAttribute("disabled");
    }

    if (authority <= 6) {
        teleportButton.removeAttribute("disabled");
        messageButton.removeAttribute("disabled");
        chatBanButton.removeAttribute("disabled");
        kickButton.removeAttribute("disabled");
    }
});

ipcRenderer.on('error', (event) => {
    loginButton.removeAttribute("disabled");
    loginButton.innerHTML = "Připojit";
    loginButton.classList.remove("btn-light");
    loginButton.classList.add("btn-success");
});

ipcRenderer.on('connected', (event) => {
    loginButton.innerHTML = "Připojeno";
    loginButton.classList.add("btn-light");
    loginButton.classList.remove("btn-success");
});