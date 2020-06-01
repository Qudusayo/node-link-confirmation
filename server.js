const express = require('express');
const uuid = require('uuid');
const path = require('path')

const mail = require('./mail')
const dbQuery =require('./db');

const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))


server.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

let id;

server.post('/', (req, res) => {
    id  = uuid.v4();
    const data = {
        email: req.body.email,
        route: id
    }
    dbQuery.pendUser(data)
    mail(data.email, `http://${req.headers.host}/confirm/${id}`)
    // console.log(data.email, `http://${req.headers.host}/confirmEmail/${id}`)
    res.sendFile(path.join(__dirname, 'confirm.html'))
})

server.get('/confirmEmail/:route', (req, res) => {
    dbQuery.addUser(req.params.route);
    res.sendFile(path.join(__dirname, 'success.html'));
});

const port = process.env.PORT || 4500
server.listen(port, () => console.log(`Sever started on port ${port}`))