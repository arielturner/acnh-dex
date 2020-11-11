const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.get('/:name', (req, res) => {
  User.find({ name: req.params.name })
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const newUser = new User({
    name,
  });
  newUser.save()
    .then(() => res.json())
    .catch((err) => res.status(500).json(err));
});

router.put('/', (req, res) => {
  const { name, collectibles } = req.body;

  User.findOneAndUpdate({ name }, { $addToSet: { collectibles } }, { upsert: true })
    .then(() => res.json())
    .catch((err) => res.status(500).json(err));
});

router.delete('/:name/:category/:id', (req, res) => {
  const { name, category, id } = req.params;
  User.findOneAndUpdate({ name }, { $pull: { collectibles: { category, id } } })
    .then(() => res.json())
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
