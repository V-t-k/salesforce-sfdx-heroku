import express from 'express';
import {
    Sfdx
} from './src/sfdx.js';
import {
    PORT
} from './utils/utils.js';

const app = express();

app.use(express.json());

app.route('/')
    .get((req, res) => {

        let clientId = req.query.clientId;
        let userName = req.query.userName;

        let sfdxClient = new Sfdx(clientId, userName);

        sfdxClient.authorize()
            .then((data) => {
                return sfdxClient.getData();
            })
            .then((data) => {
                return sfdxClient.getOrgLimits();
            })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => console.log(err));
    })
    .post((req, res) => {
        res.send(req.query);
    })
    .put((req, res) => {
        let clientId = req.body.clientId;
        let userName = req.body.userName;
        let scractchSettingsData = req.body;
    
        delete scractchSettingsData.clientId;
        delete scractchSettingsData.userName;

        let sfdxClient = new Sfdx(clientId, userName);

        sfdxClient.createScratchOrg(scractchSettingsData)
            .then((data) => {
                console.log('data >>> ' + data);

                let stringifiedData = JSON.stringify(data);
                console.log('stringified data >>> ' + stringifiedData);

                let userName = stringifiedData.substring(stringifiedData.lastIndexOf(': ') + 2, stringifiedData.lastIndexOf('\n')) ;
                console.log('username : ' + userName);
                console.log('data.result : ' + data.result);

                let password = sfdxClient.userPasswordGenerate(userName);
                console.log('password >>> ' + password);

                let creds = {
                    password,
                    userName
                }
                res.send(creds);
                // return sfdxClient.userPasswordGenerate(userName);
            })
            // .then((data) => {
            //     console.log('data : ' + JSON.stringify(data));
            //     res.send(data);
            // })
            .catch((err) => {
                console.log(err);
            });
    })
    .delete((req, res) => {
        res.send(req.query);
    });



app.listen(PORT, () => {
    console.log(`Listening PORT: ${PORT}`);
});