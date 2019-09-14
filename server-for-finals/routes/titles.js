const express = require('express');
const TitleDB = require('../modul/titles');

const titleDB = new TitleDB();
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const titlesArray = await titleDB.readTitles();
  res.render('titles', { title: 'Titles list', titles: titlesArray });
});

router.get('/create', (req, res, next) => {
  res.render('create');
});

router.post('/create', async (req, res, next) => {
  await titleDB.createTitle(req.body.title);
  res.redirect('/titles');
});

router.get('/edit/:id', async (req, res, next) => {
  const choosenTitle = await titleDB.readTitles(parseInt(req.params.id, 10));
  res.render('edit', { title: choosenTitle[0] });
});

router.post('/edit/:id', async (req, res, next) => {
  await titleDB.updateTitle(req.body.title, parseInt(req.params.id, 10));
  res.redirect('/titles');
});

router.get('/delete/:id', async (req, res, next) => {
  await titleDB.deleteTitle(parseInt(req.params.id, 10));
  res.redirect('/titles');
});

module.exports = router;
