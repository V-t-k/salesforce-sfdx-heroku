import child_process from 'child_process';
import {JWT_KEY_FILE, DEVHUB_ORG_ALIAS, SCRATCH_CONFIG_FILE, configScratchSettingsFile} from '../utils/utils.js';
import fs from 'fs';

const exec = child_process.exec;

class Sfdx {
    constructor(clientId, userName) {
        this.clientId = clientId;
        this.userName = userName;
    }

    authorize() {
        let command = 
            `sfdx force:auth:jwt:grant -i ${this.clientId} -f ${JWT_KEY_FILE} -u ${this.userName} -a ${DEVHUB_ORG_ALIAS}`;
        return this.cliExecute(command);
    }

    getData() {
        let command = 
            `sfdx force:data:soql:query ` +
            `-q "SELECT Id, Name, Account.Name FROM Contact" ` +
            `-u ${DEVHUB_ORG_ALIAS}`;
        
        return this.cliExecute(command);
    }


    getOrgLimits() {
        let command = 
            `sfdx force:limits:api:display ` +
            `-u ${DEVHUB_ORG_ALIAS}`;

       return this.cliExecute(command);
    }

    createScratchOrg(scractchSettingsData) {
        let command = 
            `sfdx force:org:create -f ${SCRATCH_CONFIG_FILE} ` +
            `--json -v ${DEVHUB_ORG_ALIAS} -d 30`;
        
        return new Promise((resolve, reject) => {
            configScratchSettingsFile(scractchSettingsData)
            .then((data) => {
                return this.cliExecute(command);
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
        });
    }

    userPasswordGenerate(userName) {
        let command = `sfdx force:user:password:generate -u ${userName} -v ${DEVHUB_ORG_ALIAS} --json`;

        return this.cliExecute(command);
    }

    

    cliExecute(command) {
        return new Promise((resolve, reject) => {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stdout);
                }
            });
        });
    }
}

export {Sfdx};