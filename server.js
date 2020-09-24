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

        console.log('query: ' + JSON.stringify(req.query));
        console.log('clientId: ' + req.query.clientId);
        console.log('userName: ' + req.query.userName);

        let clientId = req.query.clientId;
        let userName = req.query.userName;

        let sfdxClient = new Sfdx(clientId, userName);

        sfdxClient.authorize()
            .then((data) => {
                console.log('data 1 >>>> ');
                console.log(data);
                return sfdxClient.getData();
            })
            .then((data) => {
                console.log('data 2 >>>> ');
                console.log(data);
                return sfdxClient.getOrgLimits();
            })
            .then((data) => {
                console.log('data 3 >>>> ');
                console.log(data);
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
                let json = JSON.parse(data);
                return sfdxClient.userPasswordGenerate(json.result.username);
            })
            .then((data) => {
                res.send(data);
            })
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