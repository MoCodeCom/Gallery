const express = require('express');
const router = express.Router();


/****************************************************/
const ImageController = require('../controllers/ImageController');

/****************************************************/
/* Get all data according to image id or specific image*/
router.get('/getall', ImageController.getAll);
router.get('/getbyid', ImageController.getById);


/**************************************************/
/* Exist image */

/* Add image */
router.post('/add/image', ImageController.add_Image);

/* Delete image */
router.delete('/delete/image/:id', ImageController.delete_Image);

/**************************************************/
module.exports = router;