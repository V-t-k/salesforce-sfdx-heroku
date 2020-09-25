import path from 'path';
import fs from 'fs';
import { promisify } from 'util'
// import fs from 'fs/promises'

const writeFile = promisify(fs.writeFile);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log('__dirname : ' + __dirname);
const JWT_KEY_FILE = path.join(__dirname, '..', '..', 'config' ,'certificate', 'privateKey.key').substring(1);
const SCRATCH_CONFIG_FILE = path.join(__dirname, '..', 'config', 'scratchSettings', 'project-scratch-def.json');
console.log('SCRATCH_CONFIG_FILE : ' + SCRATCH_CONFIG_FILE);
const SCRATCH_CONFIG_FILE1 = path.join(__dirname, '..', 'config', 'scratchSettings', 'project-scratch-def.json').substring(1);
console.log('SCRATCH_CONFIG_FILE1 : ' + SCRATCH_CONFIG_FILE1);
const SCRATCH_CONFIG_FILE2 = path.join(__dirname, '..', '..', 'config', 'scratchSettings', 'project-scratch-def.json');
console.log('SCRATCH_CONFIG_FILE2 : ' + SCRATCH_CONFIG_FILE2);
const DEVHUB_ORG_ALIAS = 'DevHub';
const SCRACTH_ORG_ALIAS = 'Scratch';

const PORT = process.env.PORT || 3003;

async function configScratchSettingsFile(scractchSettingsData) {
    try {
        //console.log('scractchSettingsData : ' + JSON.stringify(scractchSettingsData));
        //console.log('SCRATCH_CONFIG_FILE : ' + SCRATCH_CONFIG_FILE);
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

// function configScratchSettingsFile(scractchSettingsData) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(SCRATCH_CONFIG_FILE, JSON.stringify(scractchSettingsData, ' ', 4), 'UTF-8', (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }



export {__dirname, JWT_KEY_FILE, SCRATCH_CONFIG_FILE, DEVHUB_ORG_ALIAS, SCRACTH_ORG_ALIAS, PORT, configScratchSettingsFile};