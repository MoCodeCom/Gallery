const db = require("../models/ImagesModels");

/******************************************* */
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


exports.add_Image = async(req, res, next)=>{
    const data = req.body;
    await db.add_Image(data.image_id, data.title, data.size, data.url, data.type, data.desc, null);
    /*
    return await db.exist()
    .then(async result =>{
        if(result[0].length === 0){
            await db.add_Image(data.image_id, data.title, data.size, data.url, data.type, data.desc, null)
            .then(result =>{
                res.status(200).json({
                    message:'The image has been added.',
                    result: result
                });
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
    });*/
    
} 


exports.delete_Image = async(req, res, next)=>{
    const id = req.query.id;

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
    })
}
