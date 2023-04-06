import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'


mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName: 'backend',
}).then(() => console.log('Database connected')).catch((e) => console.log(e));


const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const Message = mongoose.model('Message', messageSchema);

const app = express();

//static files
app.use(express.static(path.join(path.resolve(),'public')));
//middleware to see data
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//setting up view engine
app.set("view engine","ejs");

app.get('/', (req, res) => {
    // res.send("Welcome to express");
    // const pathlocation = path.resolve();
    // res.sendFile(path.join(pathlocation, './index.html'));

    // res.render('index.ejs');
    // console.log(req.cookies);
    const { token } = req.cookies;
    if(token) {
        res.render('logout');
    }else{
        res.render('login');
    }
})

app.post('/login', (req, res) => {
    res.cookie('token', 'iamin', {
        httpOnly: true,
    });
    res.redirect('/');
})

app.get('/logout', (req, res) => {
    res.cookie('token', null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.redirect('/');
});

app.get('/add', async (req, res) => {
    await Message.create({
        name:"Eshwar1",
        email:'sample1@example.com',
    })
    res.send('Nice');
})
app.get('/success', (req, res) => {
    res.render('success');
})
app.post('/',async (req, res) => {
    const messageBody = {name: req.body.name, email: req.body.email};
    console.log(messageBody);
    await Message.create(messageBody);
    res.redirect('/success');
})

app.listen(5000, () => {
    console.log('listening on port');
});