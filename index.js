import express from 'express';
import path from 'path';

const app = express();

//static files
app.use(express.static(path.join(path.resolve(),'public')));
//middleware to see data
app.use(express.urlencoded({extended: true}));

//setting up view engine
app.set("view engine","ejs");

app.get('/', (req, res) => {
    // res.send("Welcome to express");
    // const pathlocation = path.resolve();
    // res.sendFile(path.join(pathlocation, './index.html'));

    // res.render('index.ejs');
    res.render('index', {name: 'Eshwar'});

})
app.post('/', (req, res) => {
    console.log(req.body);
    res.send("Success");
})

app.listen(5000, () => {
    console.log('listening on port');
});