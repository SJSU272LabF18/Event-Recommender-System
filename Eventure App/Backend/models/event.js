var mongoose = require('mongoose');

var Events = mongoose.model('Events',{
    eventname :{
        type : String
    },
    eventdesc :{
        type : String
    },
    eventdate :{
        type : String
    },
    eventstarttime :{
        type : String
    },
    eventduration :{
        type : String
    },
    venuedetails :{
        type : String
    },
    venuecity :{
        type : String
    },
    venuestate :{
        type : String
    },
    venuezipcode :{
        type : String
    },
    venuecountry :{
        type : String
    }
});

module.exports = {Events};