const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');
const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err){
        if (err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.log('Conexion con BD perdida');
        }
        if (err.code == 'ER_CON_COUNT_ERROR'){
            console.log('Demasiadas conecciones en BD');
        }
        if (err.code == 'ECONNREFUSED'){
            console.log('Conexion a BD rechazada');
        }
    }
    if (connection) connection.release();
    console.log('BD conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;