const mysql = require('mysql');
const { promisify } = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONECION A LA BASE DE DATOS FUE PERDIDA');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('EXISTEN MUCHAS CONECCIONES A LA BASE DE DATOS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONNECION FUE RECHAZADA');
        }
    }
    if(connection) connection.release();
    console.log('la base de datos esta conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports =pool;