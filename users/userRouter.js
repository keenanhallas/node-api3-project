const express = require('express');
const userDb = require("./userDb");
const postDb = require("../posts/postDb");
const { response } = require('express');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err);
      //error handler here
    });
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  const post = req.body;
  post.user_id = req.user.id;
  postDb.insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err);
      //error handler here
    })
});

router.get('/', (req, res) => {
  userDb.get()
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
  userDb.getUserPosts(req.user.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      //error handler here
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.user.id)
    .then(response => {
      res.send(204).end();
    })
    .catch(err => {
      console.log(err);
      //error handler here
    });
});

router.put('/:id', validateUserId, (req, res) => {
  userDb.update(req.params.id, req.body)
    .then(response => {
      const updatedUser = req.body;
      updatedUser.id = req.params.id;
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      //error handler here
    });
});

//custom middleware

function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
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
  if (!req.body) {
    res.status(400).json({ message: "missing user data" }).end();
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" }).end();
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
