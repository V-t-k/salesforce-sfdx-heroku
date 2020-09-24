import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const JWT_KEY_FILE = path.join(__dirname, '..', 'config' ,'certificate', 'privateKey.key').substring(1);
const SCRATCH_CONFIG_FILE = path.join(__dirname, '..', 'config', 'scratchSettings', 'project-scratch-def.json').substring(1);
const DEVHUB_ORG_ALIAS = 'DevHub';
const SCRACTH_ORG_ALIAS = 'Scratch';

const PORT = process.env.PORT || 3003;

function configScratchSettingsFile(scractchSettingsData) {
    return new Promise((resolve, reject) => {
        fs.writeFile(SCRATCH_CONFIG_FILE, JSON.stringify(scractchSettingsData, ' ', 4), 'UTF-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}



export {__dirname, JWT_KEY_FILE, SCRATCH_CONFIG_FILE, DEVHUB_ORG_ALIAS, SCRACTH_ORG_ALIAS, PORT, configScratchSettingsFile};