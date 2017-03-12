const config = require('config');
const session = require('client-sessions');
const express = require('express');
const app = express();

const userRouter = require('./user');

const sessionConfig = config.get('sessionConfig');
app.use(session(sessionConfig));
app.use((req, res, next) => {
	if(req.gloomhavensession) {
		console.log('yaysession')
		console.log(req.gloomhavensession);
		next();
	} else {
		console.log('no session')
		next();
	}
});

app.use((req, res, next) => {
	res.header('Content-Type', 'application/json');
	next();
});

app.get('/', (req, res) => {
	res.send('Welcome to the Gloomhaven.Party API!');
});

app.use('/user', userRouter);

const server = app.listen(3000, 'localhost', () => {
	console.log('API Server started on port 3000');
});