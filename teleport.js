const { ipcRenderer } = require('electron');
const { maps } = require('./lib/maps');
const config = ipcRenderer.sendSync('getConfig', 'getConfig');

// Server select
const serverSelect = document.querySelector("#server");
if (config.servers) {
    const serverOptions = config.servers.map((server) => {
        const { id, name } = server;
        if (server.id !== 0) {
            return `<option value="${id}">${name}</option>`;
        }
    })
    serverSelect.innerHTML = serverOptions;
}

const mapSelect = document.querySelector("#mapSelect");
const mapInput = document.querySelector("#map");

// Options for map select
let options = "";
Object.keys(maps).forEach(mapId => {
    options += `<option value="${mapId}">${mapId} - ${maps[mapId]}</option>`;
});
mapSelect.innerHTML = options;

mapSelect.addEventListener('change', (e) => {
    mapInput.value = e.target.value;
    console.log(e.target.value);
});

const channelInput = document.querySelector("#channel");
const serverInput = document.querySelector("#server");
const xInput = document.querySelector("#x");
const yInput = document.querySelector("#y");
const zInput = document.querySelector("#z");
const charNamesInput = document.querySelector("#charNames");

const teleportCharInput = document.querySelector("#teleportChar");

const teleportToUserInput = document.querySelector("#teleportToUser");
const teleportToPosInput = document.querySelector("#teleportToPos");

const teleportButton = document.querySelector("#teleportButton");

teleportButton.addEventListener("click", () => {
    if (!channelInput.value) channelInput.value = 1;

    if (teleportToUserInput.checked) {
        ipcRenderer.send('teleportUserToChar', {
            server: parseInt(serverInput.value),
            charNames: charNamesInput.value,
            charNameTarget: teleportCharInput.value
        });
    }
    else if (teleportToPosInput.checked) {
        ipcRenderer.send('teleportUserToPos', {
            channel: parseInt(channelInput.value),
            server: parseInt(serverInput.value),
            map: parseInt(mapInput.value),
            x: parseFloat(xInput.value),
            y: parseFloat(yInput.value),
            z: parseFloat(zInput.value),
            charNames: charNamesInput.value,
        });
    }
    return;
});

// Options for locations select
const locationsSelect = document.querySelector("#locationsSelect");
let locations = "";
Object.keys(config.mapList).forEach(map => {
    locations += `<option value="${map}">${config.mapList[map].name}</option>`;
});
locationsSelect.innerHTML = locations;

locationsSelect.addEventListener('change', (e) => {
    const { map, x, y, z } = config.mapList[e.target.value];
    mapInput.value = map;
    xInput.value = x;
    yInput.value = y;
    zInput.value = z;
});