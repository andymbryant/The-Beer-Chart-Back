const express = require('express');

const router = new express.Router();

router.post('/note', (req, res) => {
  console.log('api route ran');
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

module.exports = router;
