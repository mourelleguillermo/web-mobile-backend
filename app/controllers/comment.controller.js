const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "content cant be empty"
        });
        return;
    }

    const comment = {
        content: req.body.content,
        postId: req.body.postId
    };

    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "something happened while makin a comment oops"
            });
    });
};

exports.findAll = (req, res) => {
    const postId = req.query.postId;
    var condition = postId ? { postId: { [Op.iLike]: `%${postId}%` } } : null;

    Comment.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "i couldnt get the comments oopsies"
            });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `i cant find a comment with the id ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "couldnt get the comment with id " + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "comment was updated successfully"
                });
            } else {
                res.send({
                    message: `cant update comment id ${id}. either i didnt find it or its empty`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "something happened while updating comment with id " + id
            });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "comment was deleted successfully"
                });
            } else {
                res.send({
                    message: `couldnt delete comment with id ${id}. might be that i didnt find it`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "something happened while deleting comment with id " + id
            });
    });
};

exports.deleteAll = (req, res) => {
    Comment.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} comments are gone!!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "something happened while deleting comments oops"
            });
    });
};