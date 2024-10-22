const express = require('express');
const router = express.Router();


/****************************************************/
const getController = require('../controllers/ImageController');

/****************************************************/

router.get('/getall', getController.getAll);
router.get('/getbyid',getController.getById);


/**************************************************/
module.exports = router;