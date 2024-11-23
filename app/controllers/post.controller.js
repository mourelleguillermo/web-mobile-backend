const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400).send({
      message: "content cant be empty"
    });
    return;
  }

  const post = {
    title: req.body.title,
    content: req.body.content
  };

  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "something happened while makin a post oops"
        });
      });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Post.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "i couldnt get the posts sorry"
        });
      });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `i cant find a post with the id ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "i couldnt get the post with id " + id
        });
      });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "post updated successfully"
        });
      } else {
        res.send({
          message: "i couldnt update the post with id ${id}. either i didnt find it or its empty"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "i couldnt update the post with id " + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "post deleted successfully"
        });
      } else {
        res.send({
          message: `i couldnt delete post with id ${id}. could be that i didnt find it`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "i couldnt delete the post with id " + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `i deleted ${nums} posts!!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "i couldnt delete the posts, something happened sorry"
        });
      });
};
