var mongoose = require('mongoose');

var Events = mongoose.model('Events',{
    oemaild : {
        type : String
    }, 
    eventname :{
        type : String
    },
    eventdescription :{
        type : String
    },
    eventdate :{
        type : String
    },
    starttime :{
        type : String
    },
    eventduration :{
        type : String
    },
    eventvenue :{
        type : String
    },
    eventcitystate :{
        type : String
    },
    // eventstate :{
    //     type : String
    // },
    eventzipcode :{
        type : String
    },
    eventcountry :{
        type : String
    },
    picturelist : {
        type : String
    },
});

module.exports = {Events};