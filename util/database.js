const mysql = require('mysql2');
/****************************************/

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'appdb',
    password:'19821955'
});


// Connect to the database
pool.getConnection((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });


/***************************************/
module.exports = pool.promise();