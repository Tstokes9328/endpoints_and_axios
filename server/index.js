const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


// THis line creates an array with 25 spots (all undefined)
// then fills each spot with a 0
// then replaces each 0 with a number between 1-25. (i+1 in the map)
let cards = Array(25).fill(0).map((v,i) => i+1);

// This is bringing in an array of 20 users.
// When instrucitons here talk about users, 
// its talking about this array
let users = require('./users');


///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
//   DO NOT CHANGE ANY CODE ABOVE THIS!!!   \\
///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////\\\\\\\\\\\\\\\\\\\\\\\
// ---------------------------------------- \\

/*
example endpoint: 
app.get('/api/friends', function(req, res) {
  res.status(200).send('Friends');
})
Put usually uses a url Parameter which looks like '/:<param>'
app.put('/api/friends/:id', function(req, res) {
  res.status(200).send('Friends');
})
*/

// Step 1-server endpoint: 
// create a test endpoint that sends simple text
app.get('/api/test', (req, res) => {
  res.status(200).send("Yo, it's Kyle!")
})


// Step 2-server endpoint: 
// create a get endpoint that sends the cards array
app.get('/api/cards', (req, res) => {
  res.status(200).send(cards)
})


// Step 3-server endpoint:
// create a get endpoint that sends the users variable
app.get('/api/users', (req, res) => {
  res.send(users)
})


// Step 4-server endpoint:
// create a get endpoint that sends the string "This button has been clicked"
app.get('/api/string', (req, res) => {
  let string = "This button has been clicked"
  res.status(200).send(string)
})


// Step 5-server endpoint:
// create a post endpoint that receives a string on the body and sends it back
// after adding 👏 on the end
// (copy that emoji to make it easier)
app.post('/api/post', (req, res) => {
  let {words} = req.body
  res.status(200).send(words + ' 👏')
})


// Step 6-server endpoint:
// create a put endpoint that receives an id as a param
// and a name and picture on the body. Find the user in the users 
// array with that id, and update its name and picture properties 
// with those passed in. Then sends the new text back
app.put('/api/users/:id', (req, res) => {
  let { id } = req.params;
  let { name, picture} = req.body;

  users.forEach((user) => {
    if(user._id == id){
      user.name = name
    }
  })
  res.status(200).send(users)
})

// Step 7-server endpoint:
// create a delete endpoint that receives an index and removes that item from the 
// cards array (hint: use a url param like '/:id')
app.delete('/api/users/:id', (req, res) => {
  let {id} = req.params
  cards.splice(id, 1)
  res.status(200).send(cards)
})
app.listen(3001, console.log('Docked at 3001'));