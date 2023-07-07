const express = require('express');
const path = require('path');
const cors = require('cors');

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

  // Repeat the task every 10 minutes (600,000 milliseconds)
  setInterval(function() {
    console.log("Task Executed at "+ Date.now());
    const data = { key1: 'value1', key2: 'value2' };

fetch("https://newlugandahymnal.onrender.com/keepAlive", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(responseData => {
    // Process the response data
    console.log(responseData);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
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
