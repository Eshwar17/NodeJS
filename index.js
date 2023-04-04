import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to express");
})

app.listen(5000, () => {
    console.log('listening on port');
});