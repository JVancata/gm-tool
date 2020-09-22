const fs = require('fs');
const path = require('path');

const loadConfig = () => {
    const configPath = process.env.PORTABLE_EXECUTABLE_DIR ? path.resolve(process.env.PORTABLE_EXECUTABLE_DIR, './config.json') : path.resolve(__dirname, '../config.json');
    const file = fs.readFileSync(configPath).toString('utf8');
    return JSON.parse(file);
}

module.exports = { loadConfig };
