var mongoose = require('mongoose');

var Properties = mongoose.model('Properties',{
    oemailid :{
        type : String
    },
    address :{
        type : String
    },
    headline :{
        type : String
    },
    type :{
        type : String
    },
    description :{
        type : String
    },
    bedroom :{
        type : String
    },
    accomodate :{
        type : String
    },
    bathroom :{
        type : String
    },
    availablestartdate :{
        type : String
    },
    availableenddate :{
        type : String
    },
    baserate :{
        type : String
    },
    picturelist : {
		type : String
    },
    state : {
		type : String
    },
    country : {
		type : String
    },
    street : {
		type : String
    },
    zipcode : {
		type : String
    }
});

module.exports = {Properties};