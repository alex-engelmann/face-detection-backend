const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const pgDatabase = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'penbed29',
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

app.listen(3000, () => {
    console.log('app is running on port 3000')
})
