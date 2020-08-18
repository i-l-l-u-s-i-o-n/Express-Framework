/**
 * @author Shivam Shukla
 * @create date 2020-08-18 11:23:49
 */


const express = require("express");
const cors = require("cors");
const fs = require("fs");
const e = require("express");

const app = express();

app.use(express.json())
app.use(cors())


// GET route to list all the employees
app.get("/7270listEmployees", (req, res) => {

    fs.readFile(__dirname + "/employees.json", "utf8", (err, employees) => {
        try {
            res.end(employees);
        } catch (err) {
            console.log(err)
            res.end(`<h1>Something went wrong!!</h1>`)
        }
    })
})


// GET route with Parameter to list particular employee
app.get("/7270listEmployeeById/:id", (req, res) => {

    fs.readFile(__dirname + "/employees.json", "utf8", (err, employees) => {
        try {
            console.log(req.params.id);
            employees = JSON.parse(employees);
            employee = employees["employee" + req.params.id];
            res.end(JSON.stringify(employee));
        } catch (err) {
            console.log(err)
            res.end(`<h1>Something went wrong!!</h1>`)
        }
    })
})

// POST route for adding employee
app.post("/7270addEmployee/:id", (req, res) => {

    fs.readFile(__dirname + "/employees.json", "utf8", (err, employees) => {
        try {
            console.log(req.params.id);
            employees = JSON.parse(employees);
            newUser = req.body;
            employees["employee" + req.params.id] = newUser;
            finalUsers = JSON.stringify(employees);
            fs.writeFile(__dirname + "/employees.json", finalUsers, (err, employees) => {
                if (err) {
                    console.log("Couldn't write file!");
                } else {
                    console.log("File Updated Successfully!");
                }
            });
            res.end(finalUsers)
        } catch (err) {
            console.log(err)
            res.end(`<h1>Something went wrong!!</h1>`)
        }
    });
});


// PUT route for updating User
app.put("/7270updateEmployee/:id", (req, res) => {

    fs.readFile(__dirname + "/employees.json", "utf8", (err, employees) => {
        try {
            console.log(req.params.id);
            employees = JSON.parse(employees);
            updatedUser = req.body;
            finalUsers = JSON.stringify(employees);

            // Checking for the particular employee
            if (employees.hasOwnProperty("employee" + req.params.id)) {
                employees["employee" + req.params.id] = updatedUser;
                finalUsers = JSON.stringify(employees);
                fs.writeFile(__dirname + "/employees.json", finalUsers, (err, employees) => {
                    if (err) {
                        console.log("Couldn't write file!");
                    } else {
                        console.log("File Updated Successfully!");
                    }
                });
            } else {
                res.write(`<h1>User with id ${req.params.id} doesn't exists!</h1>`)
            }
            res.end(finalUsers)

        } catch (err) {
            console.log(err)
            res.end(`<h1>Something went wrong!!</h1>`)
        }
    });

})

// DELETE route for deleting employee
app.delete("/7270deleteEmployee/:id", (req, res) => {

    fs.readFile(__dirname + "/employees.json", "utf8", (err, employees) => {

        finalUsers = employees
        employees = JSON.parse(employees);

        // Checking if employee exists
        if (employees.hasOwnProperty("employee" + req.params.id)) {

            delete employees["employee" + req.params.id];
            finalUsers = JSON.stringify(employees);

            fs.writeFile(__dirname + "/employees.json", finalUsers, (err, employees) => {
                if (err) {
                    console.log("Couldn't write file!");
                } else {
                    console.log("File Updated Successfully!");
                }
            })
        } else {
            res.write(`<h1>User with id ${req.params.id} doesn't exists!</h1>`);
        }
        res.end(finalUsers);
    })
})

app.listen(3000, () => {
    console.log("Server started!")
})