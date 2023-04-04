import express from 'express';
import path from 'path';

const app = express();
//setting up view engine
app.set("view engine","ejs");

app.get('/', (req, res) => {
    // res.send("Welcome to express");
    // const pathlocation = path.resolve();
    // res.sendFile(path.join(pathlocation, './index.html'));

    // res.render('index.ejs');
    res.render('index', {name: 'Eshwar'});

})

app.listen(5000, () => {
    console.log('listening on port');
});