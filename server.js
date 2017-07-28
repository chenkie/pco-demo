const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser());

const CLIENT_ID = 'fb493d88a959b9739c138854efc3c678b90ba1b324c249aa5db7e80bad45dd4b';
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://pco-demo.herokuapp.com';

let accessToken = '';

app.use(express.static(__dirname));

app.post('/auth/exchange', (req, res) => {
  const CODE = req.body.CODE;
  axios.post('https://api.planningcenteronline.com/oauth/token', {
    "grant_type": "authorization_code",
    "code": CODE,
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "redirect_uri": REDIRECT_URI
  }).then(result => {
    accessToken = result.data.access_token;
    res.send('success');
  }).catch(err => {
    res.send(err);
  });
});

app.get('/people', (req, res) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  axios.get('https://api.planningcenteronline.com/people/v2/people', { headers })
    .then(result => {
      res.send(result.data);
    }).catch(error => {
      res.send(error);
    });
});

app.listen(8080, () => {
  console.log('App running on localhost:8080');
});