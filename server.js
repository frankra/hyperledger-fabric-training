"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

const Query = require('./hyperledger-fabric-stub/fabcar/query.js');
const Invoke = require('./hyperledger-fabric-stub/fabcar/invoke.js');

app.post('/query', bodyParser.json(), (req, res) => {
  let body = req.body;

  Query.execute(body.chaincodeId, body.fcn, body.args)
    .then(response => res.json(JSON.parse(response)))
    .catch(error => res.json(error));
});

app.post('/invoke', bodyParser.json(), (req, res) => {
  let body = req.body;

  Invoke.execute(body.chaincodeId, body.fcn, body.args)
    .then(response => res.json(JSON.parse(response)))
    .catch(error => res.json(error));
});

app.listen(PORT, () => console.log(`Stub Blockchain as a Service running on port ${PORT}!`));