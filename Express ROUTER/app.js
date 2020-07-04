// by Shivam Shukla

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const dishRouter = require('./routes/dishRouter');

const HOSTNAME = "localhost";
const PORT = 3000;

const app = express();

app.use(bodyParser.json());


// Mounting the router to the endpoint so that whenever we go to dish routes, it starts with /dishes.
app.use('/dishes', dishRouter);


app.use(express.static(__dirname + "/public"))


app.use((req, res, next) => {
    res.statusCode = 202;
    res.setHeader('COntent-Type', 'text/html')
    res.send('<h1>Welcome to express</h1>')
})


const server = http.createServer(app)

server.listen(PORT, HOSTNAME, (req, res) => {
    console.log(`Listening on http://${HOSTNAME}:${PORT}`)
})