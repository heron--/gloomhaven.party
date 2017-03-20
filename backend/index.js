const config = require('config');
const session = require('client-sessions');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const authRouter = require('./auth');

const sessionConfig = config.get('sessionConfig');
app.use(session(sessionConfig));
app.use(bodyParser.json());

app.get('/api', (req, res) => { res.send('gosh dang it'); });

app.use((req, res, next) => {

	res.set({
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	if(process.env.NODE_ENV === 'development') {
		res.set({
			'Access-Control-Allow-Origin': '*'
		});
	}

	next();
});

app.get('/', (req, res) => {
	res.send('Welcome to the Gloomhaven.Party API!');
});

app.use('/auth', authRouter);

const server = app.listen(3000, 'localhost', () => {
	console.log('API Server started on port 3000');
});