const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch')
// const { default: fetch } = require('node-fetch');

const app = express();
app.use(cors({
  origin:"https://newlugandahymnal.onrender.com",
  methods:"*",
  allowedHeaders:"*"
}));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (res, req)=>{
    req.send('hello')
})
function executeTaskEvery10Minutes() {
  // Task to execute
  console.log("Executing task...");
  // const fetch = require('node-fetch');

  // Repeat the task every 10 minutes (600,000 milliseconds)
  setInterval(function() {

fetch("https://newlugandahymnal.onrender.com/keepAlive")
  .then(response => console.log(response))
  .then(responseData => {
    // Process the response data
    console.log(responseData+" ");
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
    return executeTaskEvery10Minutes();
  });
    return executeTaskEvery10Minutes();
    // Add your task logic here
  }, 600000);
}

// Call the function to start executing the task every 10 minutes
executeTaskEvery10Minutes();


app.get('/keepAlive',(req, res)=>{
  console.log('status check, clear');
  res.send("hlo");
});
// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
