const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const payment = require('./routes/payments');
const createError = require('http-errors');

const db = require('./db/pg');

app.use(db);
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/payments', payment);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err.status === 404) {
    return res.status(404).json({ message: 'Resource is not available '});
  }

  res.status(err.status || 500);
  res.json({ message: "Server is not available"});
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
