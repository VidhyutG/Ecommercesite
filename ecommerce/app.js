const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//app
const app = express();

//DATABASE
mongoose
 .connect(process.env.DATABASE, {})
 .then(() => console.log("DB connected"))
 .catch((err) => console.log("DB error =>", err));

//routes
app.get('/',(req, res) => {
  res.send('hello from node js');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
