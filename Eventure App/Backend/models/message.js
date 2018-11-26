var mongoose = require('mongoose');

var Messages = mongoose.model('Messages',{
    oemailid: {
        type: String
    },
    temailid: {
        type: String
    },
    messagethread: {
        type: Array
    },
    headline: {
        type: String
    },
    address: {
        type: String
    }

});

module.exports = { Messages };