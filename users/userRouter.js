const express = require('express');
const db = require("./userDb");
const { response } = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      //error handler here?
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.user.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      //error handler here
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then(response => {
      if (response) {
        req.user = response;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log(err);
      //error handler here
    });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
