'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT;

// App
const app = express();
app.get('/', (req, res) => {
   var regip = req.ip;
   if (regip.substr(0, 7) == "::ffff:") {
      regip=regip.substr(7)
   }
   console.log(regip);
   res.send('Hello World ma gueule');

});

app.listen(PORT, console.log(`Running on port ${PORT}`)  );
