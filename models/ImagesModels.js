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

    static getall(type){
  
        let q = "";
        if(type ==undefined || type==""){
             q =`SELECT*FROM appdb.images_tbl`;
        }else{
             q =`SELECT*FROM appdb.images_tbl WHERE type = '${type}'`;
        }
        //const q =`SELECT*FROM appdb.images_tbl;`;
        return pool.query(q);
    }

    static getbyid(imageId){

        const q= `SELECT * FROM appdb.images_tbl WHERE imageId = '${imageId}';`;
        return pool.query(q);
    }
}