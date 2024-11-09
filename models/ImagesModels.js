const images = [];
const fs = require('fs');
const path = require('path');
const pool = require('../util/database');
const { Console } = require('console');
/*************************************/

module.exports = class allimages {
    constructor(t){
        this.title = t;
    }

    save(){
        images.push(this);
        const p = path.join(path.dirname(process.mainModule.filename));
    }

    static exist(id){
        const q = `SELECT * FROM appdb.image_tbl WHERE image_id = "${id}"`;
        console.log(q);
        return pool.query(q);

    }

    static getall(type){
  
        let q = "";
        if(type ==undefined || type==""){
             q =`SELECT*FROM appdb.image_tbl`;
        }else{
             q =`SELECT*FROM appdb.image_tbl WHERE type = '${type}'`;
        }
        //const q =`SELECT*FROM appdb.images_tbl;`;
        return pool.query(q);
    }

    static getbyid(imageId){

        const q= `SELECT * FROM appdb.image_tbl WHERE imageId = '${image_id}';`;
        return pool.query(q);
    }

    static add_Image(image_id, title, size, url, type, desc, other){
        //const q1=`SET SQL_SAFE_UPDATES = 0;`;
        const qq = `INSERT INTO appdb.image_tbl ( image_id, title, size, url, type) VALUES ('${image_id}', '${title}', '${size}', '${url}', '${type}')`;
        //const q=`INSERT INTO appdb.image_tbl (image_id, title, size, url, type, desc, other) VALUES ${image_id}, ${title}, ${size}, ${url}, ${type}, ${desc}, ${other};`;
        //const q3=`SET SQL_SAFE_UPDATES = 1;`;
        //return pool.query(q);
        return pool.query(qq)
        /*
        .then(()=>{
            pool.query(q2)
            .then(()=>{
                pool.query(q3);
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err))*/
    }

    static delete_Image(id){
        const q1=`SET SQL_SAFE_UPDATES = 0;`;
        const q2=`DELETE FROM appdb.image_tbl WHERE image_id = '${id}';`;
        const q3=`SET SQL_SAFE_UPDATES = 1;`;
        return pool.query(q1)
        .then(()=>{
            pool.query(q2)
            .then(()=>{
                pool.query(q3);
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }


}