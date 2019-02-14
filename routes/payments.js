const express = require('express');
const router = express.Router();

/* GET payment listing. */
router.get('/', (req, res) => {
  res.send('Here is Get Payments');
});

module.exports = router;
