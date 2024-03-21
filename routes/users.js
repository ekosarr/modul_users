var express = require("express");
const Model_Users = require("../model/model_users");
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
      let id = req.session.userId;
      let Data = await Model_Users.getById(id);
      if (Data.length > 0) {
          res.render('users/index', {
              title: 'Users Home',
              email: Data[0].email
          });
      } else {
          res.status(401).json({ error: 'user tidak ada' });
      }
  } catch (error) {
      res.status(501).json('Butuh akses login');
  }
});


module.exports = router;
