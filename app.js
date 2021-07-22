const express = require('express')
const app = express()
const User = require('./my_user_model')
const session = require('express-session')
const hf = require('./config/hf')

// parses values to req.body
app.use(express.json())
// set cookies
app.use(session(
    {
        secret: 'some top secret value',
        resave: false,
        saveUninitialized: true
    }
))
// set view engine
app.set('view engine','ejs')
// controllers

// add new user
app.post('/users', async (req, res) => {
    // create a new User
    let user = new User()
    try {
        const msg = await user.create(req.body)
        res.status(201).send({"msg" : msg})
    } catch(err) {
        res.status(400).send({"err" : err})
    }
})
// get all users
app.get('/users', async (req, res) => {
    let user = new User()
    try {
        const users = await user.all()
        res.status(201).send({"users" : users})
    } catch(err) {
        res.status(400).send({"err" : err})
    }
})

app.put('/users', hf.isAuthenticated, async (req, res) => {
    try{
        let user = new User()
        const msg = await user.update(req.session.user_id, "password", req.body.password)
        res.status(201).send({"msg" : msg})
    }catch(err) {
        console.log(err)
    }
})

app.delete('/users', hf.isAuthenticated, async (req, res) => {
    try{
        console.log(req.session.user_id)
        let user = new User()
        const msg = await user.destroy(req.session.user_id)
        req.session.destroy()
        res.status(201).send({"msg" : msg})
    }catch(err) {
        console.log(err)
    }
})

app.delete('/logout',hf.isAuthenticated, async (req, res) => {
    req.session.destroy()
    res.status(201).send({"msg" : "successfully logged out"})
})

app.post('/sign_in', async (req, res) => {
    let user =new User()
    const resData = await user.authenticate(req.body.email, req.body.password)
    req.session.auth = true
    req.session.user_id = resData["id"] 
    res.status(201).send(resData)
})

app.get('/display', async (req, res) => {
    let user = new User()
    try {
        const users = await user.all()
        res.render('index', {"users" : users, "keys" : Object.keys(users[0])})
    } catch(err) {
        res.status(400).send({"err" : err})
    }
})

// set up server
app.listen(3000, ()=> {
    console.log("server is running on PORT 3000")
})