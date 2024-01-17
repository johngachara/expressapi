var express = require('express');
var router = express.Router();
const maincontroller = require('../controllers/mainController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/create',maincontroller.Create);
router.get('/get_all',maincontroller.Get_all);
router.get('/one/:id',maincontroller.Get_one);
router.put('/update/:id',maincontroller.Update);
router.delete('/delete/:id',maincontroller.Delete_one);
router.delete('/delete_all',maincontroller.Delete_all);
const not_found = (req, res) => {
  res.status(404).send("Invalid api endpoint");
};
router.use(not_found);


module.exports = router;
