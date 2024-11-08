const db = require("../models/ImagesModels");
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

/*************************************/

const spacesEndPoint = new AWS.Endpoint('https://galleryappasset.lon1.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint:spacesEndPoint,
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
/*************************************/


//accessKey: DO002PRGF24CMEQN4PBR
//secretKey: DNew5lA5bjZto2jZm+DjLrpp8cast+0rULaSp2zT8EA


/*************************************/
exports.getAll = async(req, res, next)=>{

    const type = req.query.type;
    await db.getall(type)
    .then(result =>{
        res.status(200).json({
            result:result[0]
        })
    })
}

exports.getById = async(req, res, next)=>{
    
    const imageId = req.query.imageId;

    await db.getbyid(imageId)
    .then(result =>{

        res.status(200).json({
            result:result[0]
        })
    })
}
/*
exports.add_Image = async(req, res, next)=>{
    
    const data = req.body;
    //await db.add_Image(data.image_id, data.title,data.size,data.url,data.type, data.other )
    
    await db.existImage(data.image_id)
    .then(async result =>{
        
        if(result[0].length === 0){
            await db.add_Image(data.image_id, data.title,data.size,data.url,data.type, data.other )
            .then(result =>{
                //res.sendFile(__dirname + data.url);
            })
            .catch(error =>{
                console.error(error);
                res.status(200).json({
                    message:'There is an error occured when added a new image'
                });
            });
        }
    })
    .catch(error =>{
        res.status().json({
            message:'There is an error occured when added a new image.'
        });
    })
        
    
} */

exports.delete_Image = async(req, res, next)=>{
    const id = req.params.id;
    
    db.delete_Image(id)
    .then(result =>{
        res.status(200).json({
            message:`An image with number "${id}" has been deleted.`,
            result:result
        })
    })
    .catch(err =>{
        res.status(200).json({
            message:'There is an error occured when delete image'
        });
    });
}

exports.add_Image = async(req, res, next)=>{
    try{
        //Check if image file is exist.
        if(!req.file){
            return res.status(400).json({message:'No image file uploaded.'});
        }


        const file = req.file;
        const data = req.body;

        //Generate a unique Id
        const imageId = data.image_id || uuidv4();
        console.log(imageId);
        const params = {
            Bucket: process.env.DO_SPACES_NAME,
            Key: `uploads/${imageId}_${file.originalname}`, // Organize by 'uploads' folder in your Space
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };
        // Check if the image already exists
        const existingImage = await db.existImage(imageId);
        if (existingImage[0].length !== 0) {
            return res.status(409).json({ message: 'Image already exists' });
        }

        // Upload image to DigitalOcean Space
        const uploadResult = await s3.upload(params).promise();

        // After uploading, insert image metadata into the database
        await db.add_Image(imageId, data.title, file.size, uploadResult.Location, file.mimetype, data.other);

        // Send back the response with the image URL
        res.status(201).json({
            message: 'Image uploaded and saved successfully',
            imageUrl: uploadResult.Location,
        });
    } catch (error) {
        console.error('Error uploading or saving image:', error);
        res.status(500).json({
            message: 'An error occurred while uploading or saving the image',
        });
    }
        
    
}
