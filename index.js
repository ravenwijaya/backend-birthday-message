const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');  
const userRoutes = require('./routes/users');
const helpers = require("./helpers/cron-ping");

helpers.Schedule();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/api/users', userRoutes);

const PORT = 8000;
app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
