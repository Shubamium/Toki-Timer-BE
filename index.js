// Import the Express module
const { default: axios } = require('axios');
const express = require('express');
const cors = require('cors');

// Create a new instance of the Express app
const app = express();
app.use(cors());
app.get('/',(req,res)=>{
  res.send('Api is running correctly!');
});
// Define a route handler for the root URL
app.get('/home', async (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;
    try{
      // const route = `http://api.positionstack.com/v1/reverse?access_key=e1f5483fcad8a99f2f94b4739460b29f&query=-6.2686%2C106.9423&limit=1&output=json&timezone_module=1`;
       //   res.send('Hello World!');
      const apiKey = 'e1f5483fcad8a99f2f94b4739460b29f';
      const url = new URL('http://api.positionstack.com/v1/reverse')
      url.searchParams.append('access_key',apiKey);
      const coord = lat + ',' + long;
      url.searchParams.append('query',coord);

      url.searchParams.append('limit',1);
      url.searchParams.append('output','json');
      url.searchParams.append('timezone_module','1');
      const result = await axios.get(url);
      res.send(result.data);
      console.log({lat,long});
    }catch(err){
      res.send(err);
    }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


