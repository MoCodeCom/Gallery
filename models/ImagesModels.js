const images = [];
const fs = require('fs');
const path = require('path');
const pool = require('../util/database');

/*************************************/

module.exports = class allimages {
    constructor(t){
        this.title = t;
    }

    save(){
        images.push(this);
        const p = path.join(path.dirname(process.mainModule.filename));
    }

    static existImage(id){
        const q = `SELECT * FROM appdb.images_table WHERE image_id = '${id}';`;
        return pool.query(q);

    }

    static getall(type){
  
        let q = "";
        if(type ==undefined || type==""){
             q =`SELECT*FROM appdb.image_tbl`;
        }else{
             q =`SELECT*FROM appdb.image_tbl WHERE type = '${type}';`;
        }
        //const q =`SELECT*FROM appdb.images_tbl;`;
        return pool.query(q);
    }

    static getbyid(imageId){

        const q= `SELECT * FROM appdb.image_tbl WHERE imageId = '${imageId}';`;
        return pool.query(q);
    }

    static add_Image(image_id, title, size, url, type, other){
        const q=`INSERT INTO appdb.image_tbl(image_id, title, size, url, type, other) VALUES ('${image_id}', '${title}', '${size}', '${url}', '${type}', '${other}');`;
        
        return pool.query(q);
    }

    static delete_Image(id){
        //const q1=`SET SQL_SAFE_UPDATES = 0;`;
        const q2=`DELETE FROM appdb.image_tbl WHERE image_id='${id}';`;
        //const q3=`SET SQL_SAFE_UPDATES = 1;`;
        return pool.query(q2);
        /*
        .then(()=>{
            pool.query(q2)
            .then(()=>{
                pool.query(q3);
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err));
        */
    }


}