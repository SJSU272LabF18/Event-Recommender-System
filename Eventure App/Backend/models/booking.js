var mongoose = require('mongoose');

var Bookings = mongoose.model('Bookings',{
    oemailid :{
        type : String
    },
    temailid :{
        type : String
    },
    bookedstartdate :{
        type : String
    },
    bookedenddate :{
        type : String
    },
    pid : {
        type : String
    },
    accomodates :{
        type : String
    },
    price :{
        type : String
    },
    headline : {
        type : String
    },
    location : {
        type : String
    }
});

module.exports = {Bookings};