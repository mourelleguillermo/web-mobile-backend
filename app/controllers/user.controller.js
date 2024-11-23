const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "username, email and password cant be empty"
        });
        return;
    }

		const user = {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
		};

		User.create(user)
				.then(data => {
						res.send(data);
				})
				.catch(err => {
						res.status(500).send({
								message:
										err.message || "something happened while makin ur user oops"
						});
				});
};

exports.findAll = (req, res) => {
	const username = req.query.username;
	var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

	User.findAll({ where: condition })
			.then(data => {
					res.send(data);
			})
			.catch(err => {
					res.status(500).send({
							message:
									err.message || "i couldnt get the users my bad"
					});
			});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	User.findByPk(id)
			.then(data => {
					if (data) {
							res.send(data);
					} else {
							res.status(404).send({
									message: `i cant find a user with the id ${id}`
							});
					}
			})
			.catch(err => {
					res.status(500).send({
							message: err.message || "i couldnt get the user with id " + id
					});
			});
};

exports.update = (req, res) => {
	const id = req.params.id;

	User.update(req.body, {
			where: { id: id }
	})
			.then(num => {
					if (num == 1) {
							res.send({
									message: "user updated successfully"
							});
					} else {
							res.send({
									message: "i couldnt update the user with id ${id}. either i didnt find it or its empty"
							});
					}
			})
			.catch(err => {
					res.status(500).send({
							message: "i couldnt update the user with id " + id
					});
			});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	User.destroy({
			where: { id: id }
	})
			.then(num => {
					if (num == 1) {
							res.send({
									message: "user deleted successfully"
							});
					} else {
							res.send({
									message: `i couldnt delete user with id ${id}. could be that i didnt find it`
							});
					}
			})
			.catch(err => {
					res.status(500).send({
							message: "i couldnt delete the user with id " + id
					});
			});
};

exports.deleteAll = (req, res) => {
	User.destroy({
			where: {},
			truncate: false
	})
			.then(nums => {
					res.send({ message: `i deleted ${nums} users!!` });
			})
			.catch(err => {
					res.status(500).send({
							message:
									err.message || "i couldnt delete the users, something happened sorry"
					});
			});
};
