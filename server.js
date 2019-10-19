const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')
const dotenv = require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const pgDatabase = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'face-recognition-db'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, pgDatabase, bcrypt, saltRounds)})
app.post('/register', (req, res) => { register.handleRegister(req, res, pgDatabase, bcrypt, saltRounds)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, pgDatabase)})
app.put('/image', (req, res) => {image.handleImage(req, res, pgDatabase)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(3000, () => {
    console.log('app is running on port 3000')
})
