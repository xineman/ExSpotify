const express = require('express');
const request = require('request');
const querystring = require('query-string');
var router = express.Router();

const client_id = "";
const client_secret = "";
const redirect_uri = "http://localhost:3000/auth/vk/callback";
const utilities = require('../utilities.js');
var storedState;

router.get("/vk", function(req, res) {
    var scope = 'audio';

    storedState = utilities.generateRandomString(16);
    // res.cookie(stateKey, state);
    res.redirect('https://oauth.vk.com/authorize?' + querystring.stringify({response_type: 'code', client_id: client_id, scope: scope, redirect_uri: redirect_uri, state: storedState}));
});
router.get("/vk/callback", function(req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    if (state === null || state !== storedState) {
        res.redirect('/#' + querystring.stringify({error: 'state_mismatch'}));
    } else {
        request.get('https://oauth.vk.com/access_token?' + querystring.stringify({client_id: client_id, client_secret: client_secret, redirect_uri: redirect_uri, code: code}), function(error, response, body) {
            if (!error && response.statusCode === 200) {

                res.cookie("vk_access_token", JSON.parse(body).access_token, {
                	expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
                });
                res.send("<script>window.close();</script>");
            } else
            res.send(body);
        });
    }
});
module.exports = router;
