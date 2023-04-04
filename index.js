// const http = require('http');
// const gfName = require('./feature')
import http from 'http'
import gfName from './feature.js'
import { gfName1,gfName2 } from './feature.js';

console.log(gfName);
console.log(gfName1);
console.log(gfName2);

const server = http.createServer((req, res) => {
    if(req.url === '/about') {
        res.end('<h1>About page</h1>');
    }
    else if(req.url === '/contact'){
        res.end('<h1>Contact page</h>');
    }
    else if(req.url === '/') {
        res.end('<h1>Home page</h1>');
    }
    else{
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(5000,() => {
    console.log("Server is working");
});

