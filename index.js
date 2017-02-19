'use strict';
require('dotenv').config();
const host = (typeof process.env.VIRTUAL_HOST == 'undefiend') ? `http://localhost:${process.env.PORT}` : `http://${process.env.VIRTUAL_HOST}`

const joinPath = require('path').join;
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const server = express();
const staticFiles = joinPath(__dirname, './', 'public');

const hbsData = require('./src/data.json');
const viewFields = joinPath(__dirname, './', 'src/hbs/templates');
const partialsFiles = joinPath(__dirname, './', 'src/hbs/partials');
let isProd = /santiagojsosa.com/.test(host);

server.use(express.static(staticFiles));
server.set('view engine', 'hbs');
server.set('views', viewFields);
hbs.registerPartials(partialsFiles);

server.use(bodyParser.json()); // for parsing application/json

server.get('/', (req, res) => {
	console.log(new Date(), 'index')
	hbsData.isProd = isProd;
	return res.render('index', hbsData);
});

// redirect all non-files to root
server.all('/:path', (req, res) => {
	console.log(new Date(), 'redirect', req.params.path)
	return res.status(301).redirect('/');
});


// console.log(process.env);
server.listen(process.env.PORT, ()=>console.log(host));