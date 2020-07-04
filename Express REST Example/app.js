// by Shivam Shukla

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const HOSTNAME = "localhost";
const PORT = 3000;

const app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"))


// Creating middleware that will be applied to all the requests to /dishes
app.all('/dishes', (req, res, next) => {

    // Modifying the res object.
    res.statusCode = 202;
    res.setHeader('Content-Type', 'text/plain')

    // Sending these changes to the res object to all the routes below for /dishes.
    next()
});

app.get('/dishes', (req, res) => {
    // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.
    res.end("Here is the list of all the dishes.")
})

app.post('/dishes', (req, res) => {
    // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.

    // When we submit the post data, the body-parser will parse that data and add it to the body property of req object.
    // So we can access the post data using 'req.body'
    res.end("Will add the dish to the database: " + req.body.name + " with description : " + req.body.desc)
})


app.put('/dishes', (req, res) => {
    res.statusCode = 403 // forbidden
    res.end("PUT is not supported for /dishes. You must provide the dishID to update the particular dish")
})

app.delete('/dishes', (req, res) => {
    // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.
    res.end("Deleting all the dishes.")
})

app.get('/dishes/:dishID', (req, res) => {
    // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.
    res.end("Here is the list of dish: " + req.params.dishID)
})

app.post('/dishes/:dishID', (req, res) => {
    // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.

    // When we submit the post data, the body-parser will parse that data and add it to the body property of req object.
    // So we can access the post data using 'req.body'
    res.statusCode = 403 // forbidden
    res.end("POST is not supported for /dishes/:dishID.")

})


app.put('/dishes/:dishID', (req, res) => {
    res.write("Updating dish ID : " + req.params.dishID + "\n")
    res.end("Will update dish name : " + req.body.name + " with description : " + req.body.desc)
})

app.delete('/dishes/:dishID', (req, res) => {
    // res.status code is 202 as we modified in above middleware and called next to propagate those changes to route that starts with /dishes.
    res.end("Deleting dish ID : " + req.params.dishID)
})


app.use((req, res, next) => {
    res.statusCode = 202;
    res.setHeader('COntent-Type', 'text/html')
    res.send('<h1>Welcome to express</h1>')
})


const server = http.createServer(app)

server.listen(PORT, HOSTNAME, (req, res) => {
    console.log(`Listening on http://${HOSTNAME}:${PORT}`)
})