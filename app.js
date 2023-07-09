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

  function performFetch() {
    fetch("https://newlugandahymnal.onrender.com/keepAlive")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(responseData => {
        // Process the response data
        console.log("response is clear");
      })
      .catch(error => {
        // Handle any errors gracefully
        console.log('Error:', error);
        // Take alternative actions or provide appropriate feedback
      })
      .finally(() => {
        // Call the function again after 10 minutes, regardless of success or error
        setTimeout(performFetch, 600000);
      });
  }

  // Initial fetch request
  performFetch();
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
