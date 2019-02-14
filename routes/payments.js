const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: true });

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
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'Request requires body'
    });
  }
  
  const postSchema = require('../schemas/payments/payments.create.schemas');
  const validate = ajv.compile(postSchema);
  
  const valid = validate(req.body);
  if (!valid) {
    return res.status(422).json({
      message: `Request body is invalid format error: ${validate.errors}`
    });
  }
  
  try {
    await req.db.insert(req.body).into('payments');
    return res.status(200).json({ message: 'Payment item added' });
  } catch (err) {
    return res.status(500).json({ message: 'Payment item cannot be added' });
  }
});

router.put('/:id', async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: 'Request requires body'
    });
  }
  
  if (!req.body) {
    return res.status(400).json({
      message: 'Request requires body'
    });
  }
  
  const postSchema = require('../schemas/payments/payments.update.schemas');
  const validate = ajv.compile(postSchema);
  
  const valid = validate(req.body);
  if (!valid) {
    return res.status(422).json({
      message: `Request body is invalid format error: ${validate.errors}`
    });
  }
  
  try {
    await req.db('payments').where({ id: req.params.id }).update(req.body);
    res.status(200).json({ message: 'Payment item updated' });
  } catch (e) {
    res.status(500).json({ message: 'Payment item cannot be updated' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await req.db('payments').where({ id: req.params.id }).del();
    res.status(200).json({ message: `Payment item id ${req.params.id} deleted`});
  } catch (e) {
    res.status(500).json({ message: 'Payment item cannot be deleted' });
  }
});

module.exports = router;
