const express = require('express');
const path = require('path');
const request = require('request');
const querystring = require('query-string'); //Edited
const cookieParser = require('cookie-parser');
var app = express();

var requestOptions;
var client_id = "779a5324d5774343973fd9601952154c";
var client_secret = "d7497c8b635f490e8ad8d5e1df451e69";
var redirect_uri = "http://185.5.52.181:3000/callback";
var stateKey = 'spotify_auth_state';

var generateRandomString = function(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

//DEV
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	contentBase: path.resolve(__dirname, "./public/"),
	watchContentBase: true,
	publicPath: "/js/" // Same as `output.publicPath` in most cases.
}));
//END DEV


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', function(req, res) {
	res.sendFile('index.html', {
		root: path.join(__dirname, 'public')
	});
});

app.get('/get-playlist', function(req, res) {
	requestOptions = {
		url: req.query.playlistUrl,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	sendRequest(requestOptions, res);
});

app.get('/login', function(req, res) {
	var scope = 'user-read-private user-library-read';
	var state = generateRandomString(16);
	res.cookie(stateKey, state);
	res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({response_type: 'code', client_id: client_id, scope: scope, redirect_uri: redirect_uri, state: state}));
});

app.get('/logout', function(req, res) {
	res.cookie("access_token", "", {
		expires: new Date(1000)
	});
	res.cookie("refresh_token", "", {
		expires: new Date(1000)
	});
	res.cookie("signedIn", false, {
		expires: new Date(1000)
	});
	res.redirect('/');
});

app.get('/callback', function(req, res) {

	// your application requests refresh and access tokens
	// after checking the state parameter

	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies
		? req.cookies[stateKey]
		: null;

	if (state === null || state !== storedState) {
		res.redirect('/#' + querystring.stringify({error: 'state_mismatch'}));
	} else {
		res.clearCookie(stateKey);
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
			},
			json: true
		};

		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {

				res.cookie("access_token", body.access_token, {
					expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
				});
				res.cookie("refresh_token", body.refresh_token, {
					expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
				});
				res.cookie("signedIn", true, {
					expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
				});
				res.redirect('/');
			}
		});
	}
});

app.get('/refresh_token', function(req, res) {

	// requesting access token from refresh token
	var refresh_token = req.query.refresh_token;
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
		},
		form: {
			grant_type: 'refresh_token',
			refresh_token: refresh_token
		},
		json: true
	};

	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			//var access_token = body.access_token;
			res.cookie("access_token", body.access_token, {
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
			});
			res.status(200).end();
		}
	});
});

app.listen(3000);

var token = "";
getToken();

function getToken(resToUser) {
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
		},
		form: {
			grant_type: 'client_credentials'
		},
		json: true
	};
	request.post(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			token = body.access_token;
			if (resToUser) {
				sendRequest(requestOptions, resToUser);
			}
		}
	});
}

function sendRequest(options, resToUser) {

	request.get(options, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			console.log("Responded");
			resToUser.send(body);
		} else {
			console.log("No token!");
			getToken(resToUser);
		}

	});
}
