'use strict';

const express = require(`express`);
const querystring = require('querystring')
const awsServerlessExpressMiddleware = require(`aws-serverless-express/middleware`);
const app = express();

const mocks = require(`./json`);

const request = require(`request`);

app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/schema/login', (req, res) => {
    try {
        var json;
        var url = 'schema/login/postLoginSchema.json';

        json = mocks(url);
        console.log(`JSON found, returning from ${url}`);
        res.setHeader("Cache-Control", "max-age=42");
        res.json(json);
    } catch (ex) {
        console.log(`Exception when searching for JSON. Message is : ${ex.message}`);
        return res.status(404).json(json);
    }
});

app.get(`/starships/:no`, (req, res) => {
    console.log("***** Starships info *****", req.path)

    var optionsNorm = {
        uri: `https://swapi.co/api${req.path}`,
        json: true,
        gzip: true
    }
    sendReq(optionsNorm, req, res)
})

app.get(`*`, (req, res) => {
    console.log("***** not mocked *****")
    noMocks(req, res)
})

function noMocks(req, res) {
    const message = `-> the path  ${req.path} -> is not mapped in the Server Mock `
    console.log(message);
    return res.status(404).json({ message: message });
}

function  sendReq(options, req, res){    
    request(options, (error, response) => {
        if (error) {
            return console.log(" error ", error)
        }
        const miss_mode = "Proxy";
        if (miss_mode === "Proxy") {
            console.log(`Proxy reply`);
            console.log(" Server response " + JSON.stringify(response));
            res.setHeader("Cache-Control", "max-age=0, no-cache, no-store");
            return res.json(response.body);
        } 
        return res.status(404).json(json);
    });
}

module.exports = app
