const mysql = require('mysql')
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'adritk',
    password : 'sundakelapa1',
    database : 'popokhokage',
    port     : 3306
  });
  
  module.exports = connection