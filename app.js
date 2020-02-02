const express = require('express')
//importing express package
const app = express()
//define app as express

const Datastore = require('nedb')
//import nedb

const database = new Datastore('dingo.db');
//creating database dingo.db
database.loadDatabase();
//loading/creating database

const fs = require("fs");

var list = []
//creating array list

//////////////////////READ JSON FILE AND PARSING INTO ARRAY/////////////////////////////

// fs.readFile('words.json', (err, data) => {
//     //read file words.json and store into argument data
//     if (err) throw err;
//     list = JSON.parse(data);
//     //list equals the parsed stored data from json file in the data argument
// });

///////////////////////////////////////////////////////////////////////////////////////

app.listen(3000, () => console.log('listening at 3000'))
//create server listen at port 3000, if successful log

app.use(express.static('public'))
//app will display content in the 'public' folder, in our case the index.html

app.use(express.json({limit: '10mb'}))
//receive and understand json files. limit function limits response size



app.get('/api', (request, response) => {
    //this function sets up a route expecting a get, which will return the data as response.json()
    database.find({}, (err, data) => {
    //this function tells the database to get the data 
        if(err){
            response.end()
            return
        }
        response.json(data)
        //returning the data to the request
    })
    
})

app.post('/api', (request, response) => {
    /*this function sets up a route expecting a post, first argument is the address, second is the function
    two arguments within the function: request and response
    request variable holds all the data(body from the options constant in the index.html file)
    response variable will send info to client*/

    list.push(request.body);
    //when the api receives a post, add latitude and longitude(request.body) to list array

    //////////////////////////////PUSH LIST ARRAY TO JSON FILE////////////////////////

    // fs.writeFile("./words.json", JSON.stringify(list), function(err) 
    // {
    //     //convert list into strings to word.json file
    //         if(err) 
    //         {
    //             console.log(err);
    //         } 
    //         else 
    //         {
    //             console.log("Output saved to /words.json.");
    //         }
    // });

    //////////////////////////////////////////////////////////////////////////////////
   
    const timestamp = Date.now()
    request.body.timestamp = timestamp
    database.insert(request.body)
    console.log(list)

    response.json(request.body)
    //send back "success", lat and lon as response 
    //console.log(response)
})
