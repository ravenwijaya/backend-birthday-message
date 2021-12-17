const express = require('express');
const router = express.Router();
const helpers = require("../helpers/users");
//router.get('/', ), router.post('/', )
router.route('/')
.get(helpers.getUsers)
.post(helpers.createUser);

router.route('/:userId')
.get(helpers.getUser)
.put(helpers.updateUser)
.delete(helpers.deleteUser);

module.exports = router;