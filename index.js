// const http = require('http');
// const gfName = require('./feature')
import http from 'http'
import gfName, { gfName1, gfName2 } from './feature.js'
import fs from 'fs'

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
        fs.readFile("./index.html", function(err, data){
            res.end(data);
        })
        
    }
    else{
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(5000,() => {
    console.log("Server is working");
});

