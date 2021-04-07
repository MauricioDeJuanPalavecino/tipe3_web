const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sanantonio'
});

conn.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Conecting Database');
    }
});

module.exports = conn;