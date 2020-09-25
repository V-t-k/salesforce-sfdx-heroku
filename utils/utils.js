import path from 'path';
import fs from 'fs';
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const JWT_KEY_FILE = path.join(__dirname, '..', '..', 'config' ,'certificate', 'privateKey.key').substring(1);
const SCRATCH_CONFIG_FILE = 'project-scratch-def.json';
const DEVHUB_ORG_ALIAS = 'DevHub';
const SCRACTH_ORG_ALIAS = 'Scratch';

const PORT = process.env.PORT || 3003;

async function configScratchSettingsFile(scractchSettingsData) {
    try {
        await writeFile(
            SCRATCH_CONFIG_FILE, 
            JSON.stringify(scractchSettingsData, ' ', 4),
            {
                encoding: 'UTF-8' 
            } 
        );
    } catch(error) {
        console.log(error);
    }
}

export { __dirname, JWT_KEY_FILE, SCRATCH_CONFIG_FILE, DEVHUB_ORG_ALIAS, SCRACTH_ORG_ALIAS, PORT, configScratchSettingsFile };