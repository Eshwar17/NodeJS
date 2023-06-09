import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName: 'backend',
}).then(() => console.log('Database connected')).catch((e) => console.log(e));


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.model('User', userSchema);

const app = express();

//static files
app.use(express.static(path.join(path.resolve(),'public')));
//middleware to see data
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//setting up view engine
app.set("view engine","ejs");

const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    if(token) {
        const decoded = jwt.verify(token, 'qwertyuio');
        req.user = await User.findById(decoded._id);
        next();
    }else{
        res.render('login');
    }
};

app.get('/',isAuthenticated, (req, res) => {
    // res.send("Welcome to express");
    // const pathlocation = path.resolve();
    // res.sendFile(path.join(pathlocation, './index.html'));

    // res.render('index.ejs');
    // console.log(req.cookies);
    // const { token } = req.cookies;
    // if(token) {
    //     res.render('logout');
    // }else{
    //     res.render('login');
    // }
    res.render('logout',{name: req.user.name});
})

app.post('/login',async (req, res) => {
    // console.log(req.body);
    const { name, email} = req.body;

    const user = await User.create({
        name,
        email,
    });

    //jwt token creation
    const token = jwt.sign({_id: user._id},'qwertyuio');

    res.cookie('token', token, {
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



// app.get('/add', async (req, res) => {
//     await Message.create({
//         name:"Eshwar1",
//         email:'sample1@example.com',
//     })
//     res.send('Nice');
// })
// app.get('/success', (req, res) => {
//     res.render('success');
// })
// app.post('/',async (req, res) => {
//     const messageBody = {name: req.body.name, email: req.body.email};
//     console.log(messageBody);
//     await Message.create(messageBody);
//     res.redirect('/success');
// })

app.listen(5000, () => {
    console.log('listening on port');
});