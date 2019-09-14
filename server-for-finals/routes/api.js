const express = require('express');
const UserDB = require('../modul/users');

const userDB = new UserDB();
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Server works!');
});

router.get('/users/:id', async (req, res, next) => {
  const userData = await userDB.readUsers(parseInt(req.params.id, 10));
  res.json(userData);
});

router.put('/users', async (req, res, next) => {
  const result = await userDB.updateUser(req.body);
  res.json(result);
});

router.delete('/users/:id', async (req, res, next) => {
  const result = await userDB.deleteUser(parseInt(req.params.id, 10));
  res.json(result);
});

router.post('/users', async (req, res, next) => {
  const result = await userDB.createUser(req.body);
  res.json(result);
});

router.get('/titles', async (req, res, next) => {
  const titles = await userDB.getTitles();
  res.json(titles);
});


module.exports = router;
