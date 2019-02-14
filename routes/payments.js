const express = require('express');
const router = express.Router();

/* GET payment listing. */
router.get('/', async (req, res) => {
  try {
    const results = await req.db.select().from('payments');
    res.status(200).json({ results: results });
  } catch (e) {
    res.status(500).json({ message: 'Failed to query payments' });
  }
});

router.post('/', async (req, res) => {
  try {
    await req.db.insert(req.body).into('payments');
    res.status(200).send('Payment item added');
  } catch (err) {
    res.status(500).send('Payment item cannot be added');
  }
});

module.exports = router;
