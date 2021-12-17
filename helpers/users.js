const db = require("../models");

const compareDate = (date) => {
  const today = new Date();
  const birthday = new Date(date);
  today.setHours(0, 0, 0, 0);
  today.setFullYear(0);
  birthday.setHours(0, 0, 0, 0);
  birthday.setFullYear(0);
  return birthday <= today;
};

exports.getUsers = (req, res) => {
  db.User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.createUser = (req, res) => {
  req.body.celebrated = compareDate(req.body.birthday_date);
  db.User.create(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getUser = (req, res) => {
  db.User.findById(req.params.userId)
    .then((foundUser) => {
      res.json(foundUser);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateUser = (req, res) => {
  if (req.body.birthday_date) {
    req.body.celebrated = compareDate(req.body.birthday_date);
  }
  db.User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteUser = (req, res) => {
  db.User.remove({ _id: req.params.userId })
    .then(() => {
      res.json({ message: "We deleted it!" });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getUserList = (date, zones) => {
  const data = db.User.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: ["$celebrated", false] },
            { $in: ["$location", zones] },
            { $eq: [{ $month: "$birthday_date" }, { $month: date }] },
            {
              $lte: [{ $dayOfMonth: "$birthday_date" }, { $dayOfMonth: date }],
            },
          ],
        },
      },
    },
  ])
    .then((res) => res)
    .catch((err) => console.log(err));
  return data;
};

exports.updateStatus = (userId) => {
  const user = db.User.findOneAndUpdate(
    { _id: userId },
    { celebrated: true },
    { new: true }
  )
    .then((res) => res)
    .catch((err) => console.log(err));
  return user;
};

exports.resetStatus = () => {
  const user = db.User.updateMany({}, { $set: { celebrated: false } })
    .then((res) => res)
    .catch((err) => console.log(err));
};
