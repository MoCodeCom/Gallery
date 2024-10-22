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

