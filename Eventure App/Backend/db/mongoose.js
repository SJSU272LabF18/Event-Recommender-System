var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//var dbURI = 'mongodb://localhost:27017/HomeAway'
//var dbURI = 'mongodb://root:root123@ds133271.mlab.com:33271/homeaway'
var dbURI = 'mongodb://root:root123@ds141697.mlab.com:41697/eventure'
mongoose.connect(dbURI, { poolSize: 10 });

mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + dbURI);
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });

module.exports = {mongoose};