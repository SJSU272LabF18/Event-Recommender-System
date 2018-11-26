var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    emailid :{
        type : String
    },
    password : {
        type : String
    },
    firstname : {
		type : String
	},
	lastname : {
        type : String
    },
    usertype : {
        type : String
    },
    aboutme : {
        type : String
    },
	citycountry : {
		type : String
	},
	company :{
        type : String
    },
    country : {
        type : String
    },
	zipcode : {
		type : String
	},
	languages :{
        type : String
    },
    phone : {
        type : Number
    },
	gender : {
		type : String
    },
    profilepic : {
		type : String
    }
});

module.exports = {Users};