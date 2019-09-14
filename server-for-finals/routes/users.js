const express = require('express');
const UserDB = require('../modul/users');

const userDB = new UserDB();
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const userData = await userDB.readUsers();
  res.render('users', { title: 'Users', users: userData });
});

router.get('/:id', async (req, res, next) => {
  const userData = await userDB.readUsers(parseInt(req.params.id, 10));
  res.render('users', { title: 'Choosen user:', users: userData });
});

module.exports = router;
