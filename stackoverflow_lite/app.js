require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const index = require('./routers');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //enables express to pass url encoded form format

app.disable("x-powered-by");

app.use('/api/v1/', index);


// Handle cases where invalid JSON data is passed
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    res.json({
      status: 'error',
      message: 'invalid JSON passed',
      data: null,
    });
  } else {
    next();
  }
});


app.get('/',(req,res)=>{
  return res.status(200).json({
    message: 'stack_lite API',
  })
})

//catches all unassigned routes
app.all('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'that route does not exist',
    });
  });


module.exports = app;