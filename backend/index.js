const config = require('config');
const session = require('client-sessions');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const express = require('express');
const myConnection = require('express-myconnection');
const app = express();

const authRouter = require('./auth');
const userRouter = require('./user');
const characterRouter = require('./character');

const sessionConfig = config.get('sessionConfig');
const dbConfig = config.get('dbConfig');
app.use(session(sessionConfig));
app.use(myConnection(mysql, dbConfig, 'single'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Welcome to the Gloomhaven.Party API!');
});

app.use((req, res, next) => {
	res.set({
		'Content-Type': 'application/json'
	});
	next();
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/character', characterRouter);

const server = app.listen(3000, 'localhost', () => {
	console.log('API Server started on port 3000');
});