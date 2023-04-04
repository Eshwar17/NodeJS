const http = require('http');

const server = http.createServer(() => {
    console.log("I am Create Server function")
});

server.listen(5000,() => {
    console.log("Server is working");
});

