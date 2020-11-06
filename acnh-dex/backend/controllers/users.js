const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({ name: req.query.name })
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
module.exports = router;
