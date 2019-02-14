const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const payment = require('./routes/payments');

const db = require('./db/pg');

app.use(db);
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/payments', payment);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
