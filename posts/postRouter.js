const express = require('express');

const router = express.Router();

//GET all posts
router.get('/', (req, res) => {
  // do your magic!
});

//GET a specific post
router.get('/:id', (req, res) => {
  // do your magic!
});

//DELETE a post
router.delete('/:id', (req, res) => {
  // do your magic!
});

//EDIT a post
router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
