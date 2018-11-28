//import the require dependencies
var express = require('express');
var app = express();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
//var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var {Users} = require('./models/user');
var {Properties} = require('./models/property');
var {Events} = require('./models/event')
var {Bookings} = require('./models/booking');
var {Messages} = require('./models/message');
var {mongoose} = require('./db/mongoose');
// var kafka = require("./kafka/client")
const jwt = require('jsonwebtoken');
const jwtkey = require('./config/keys');
//var routes = require('./routes/index');



/* var pool = mysql.createPool(
{
    connectionLimit :" 100",
    port : '3306' ,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'homeaway_db'
}
) */

/* module.exports = pool; */

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {

      const newFilename = `${file.originalname}`;
      cb(null, newFilename);
    },
  });
  
  const upload = multer({ storage });


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//============================================
// app.use('/', routes);
//=============================================

//Bcrypt Login 
app.post('/login',function(req,res){  
console.log("Here in login")
var emailid = req.body.emailid;
var password = req.body.password;
console.log("emailid:",emailid + " password:",password);
emailstring = emailid.replace("%40", "@")
console.log("Setting up login for :", emailstring);

Users.findOne({
    emailid: req.body.emailid
}, function(err,user){
    if (err) {
        console.log("err");
        res.code = "201";
        res.value = "Incorrect emailid and password";
        console.log(res.value);
        res.sendStatus(201).end(); 
    }
    else if(user==null){
        res.code = "201";
        res.value = "User does not exist in the database";
        console.log(res.value);
        res.sendStatus(201).end(); 
    }
    else if(user.password){
        bcrypt.compare(req.body.password, user.password, function(err, results) {
            console.log('User pwd ', req.body.password)
            console.log('Pwd in Database ', user.password)
     if(results){
/*         res.writeHead(200,{
            'Content-Type' : 'application-json'
        }) */
        jwt.sign({ user: user }, jwtkey.secret, { expiresIn: '10080s' }, (err, token) => {
            console.log("token : " + token)
            var values = {
                token: 'JWT ' + token
            }
            /* res.cookie('cookie',emailstring,{maxAge: 900000, httpOnly: false, path : '/'});  */
            req.session.user = user;
            console.log(req.session.user);
            res.status(200).json(values);
        });

      
     }
        });
     }
})
}); 


//signup
 app.post('/signup',function(req,res){
        console.log("Inside sign up")
        var salt = bcrypt.genSaltSync(10);
        var encryptedpassword = bcrypt.hashSync(req.body.password, salt);
        console.log(req.body.count)
        var user = new Users({
            emailid : req.body.emailid,
            password : encryptedpassword,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            usertype : req.body.usertype,
            count : req.body.count,
            profilepic : req.body.profilepic,

        })

        user.save().then((user) => {
            console.log("User : " + user);
            res.code = "200";
            res.sendStatus(200).end();
        },(err) =>{
            res.sendStatus(400).end();
        })
}); 

//update profile ==== before kafka==================
//  app.post('/updateprofile',function(req,res){
//     console.log("Inside Profile Update")

//     console.log("Inside Update Profile Request");
//         var emailid = req.session.user.emailid;
//         var aboutme = req.body.aboutme;
//         var citycountry = req.body.citycountry;
//         var company = req.body.company;
//         var zipcode = req.body.zipcode;
//         var country = req.body.country;
//         var languages = req.body.languages;
//         var gender = req.body.gender;
//         var profilepic = req.body.profilepic;

//         console.log("aboutme " + aboutme);
//         console.log("citycountry " + citycountry);
//         console.log("company " + company);
//         console.log("zipcode " + zipcode);
//         console.log("country " + country);
//         console.log("languages " + languages);
//         console.log("gender " + gender);
//         console.log("profilpic " + profilepic);

//         Users.findOneAndUpdate(
//             {emailid: emailid}, // find a document with that filter
//             {
//                 $set : {
//                 aboutme,
//                 citycountry,
//                 company,
//                 zipcode,
//                 country,
//                 languages,        
//                 gender,
//                 profilepic
//                 }
//             }, // document to insert when nothing was found
//             {upsert: true, new: true, runValidators: true}, // options
//             function (err, doc) { // callback
//                 if (err) {
//                     // handle error
//                     console.log(err);
//                     res.code = "200";
//                     res.sendStatus(400).end();
//                 } else {
//                    // handle document
//                    console.log("Profile updated " + doc);
//                    res.code = "200";
//                    res.sendStatus(200).end();
//                 }
//             }
//         );
// }); 

//update profile
app.post('/updateprofile',function(req,res){
    console.log("Inside Profile Update")

       var emailid = req.session.user.emailid;
       var aboutme = req.body.aboutme;
       var citycountry = req.body.citycountry;
       var company = req.body.company;
       var zipcode = req.body.zipcode;
       var country = req.body.country;
       var languages = req.body.languages;
       var gender = req.body.gender;
       var profilepic = req.body.profilepic;
       var msg = 
       {
           emailid : emailid,
           aboutme : aboutme,
           citycountry : citycountry,
           company : company,
           zipcode : zipcode,
           country : country,
           languages : languages,
           gender : gender,
           profilepic : profilepic 
       }

   //  =====================Without kafka=======================
        console.log("aboutme " + aboutme);
       console.log("citycountry " + citycountry);
       console.log("company " + company);
       console.log("zipcode " + zipcode);
       console.log("country " + country);
       console.log("languages " + languages);
       console.log("gender " + gender);
       console.log("profilpic " + profilepic);

       Users.findOneAndUpdate(
           {emailid: emailid}, // find a document with that filter
           {
               $set : {
               aboutme,
               citycountry,
               company,
               zipcode,
               country,
               languages,        
               gender,
               profilepic
               }
           }, // document to insert when nothing was found
           {upsert: true, new: true, runValidators: true}, // options
           function (err, doc) { // callback
               if (err) {
                   // handle error
                   console.log(err);
                   res.code = "200";
                   res.sendStatus(400).end();
               } else {
                  // handle document
                  console.log("Profile updated " + doc);
                  res.code = "200";
                  res.sendStatus(200).end();
               }
           }
       ); 

//        //=====================Kafka===========================
//        console.log("--Inside update profile--");
//        kafka.make_request('profileupdate',msg, function(err,results){
//        console.log('in result');
//        console.log(results);
//        if (err){
//            console.log("Inside err");
//            res.json({
//                status:"error",
//                msg:"System Error, Try Again."
//            })
//        } 
//        else{
//                    res.code = "200";
//                    res.value = results.value;
//                    res.sendStatus(200).end();
//            }
       
//    });

 });

//Get Profile
app.get('/getProfile', function(req,res){
    //================Without kafka============================
     console.log("Get Profile of user" + req.session.user.emailid )
    var emailid = req.session.user.emailid;
    Users.findOne({
        emailid: emailid
    }, function(err,user){
        console.log("inside findone")
        if (err) {
            console.log("err");
            res.code = "400";
            res.value = "Oops! Something went wrong";
            console.log(res.value);
            res.sendStatus(400).end(); 
        } else{
            console.log("success")
            res.code = "200";
            res.value = user;
            console.log("Profile fetched" + JSON.stringify(user));
            res.send(JSON.stringify(user));
        }
    }) 
//     //===============================Kafka=======================
//     console.log("--Inside get profile--");
//     var msg = {
//         emailid : req.session.user.emailid
//     }
//     kafka.make_request('getprofile',msg, function(err,results){
//         console.log('In result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.json({
//                 status:"error",
//                 msg:"System Error, Try Again."
//             })
//         } 
//         else{
//                     res.code = "200";
//                     res.value = results.value;
//                     res.send(JSON.stringify(results));
//             }
        
//     });
 })

// //Add property=======Working========
//   app.post('/addProperty',function(req,res){
//     //=================Without Kafka===============
//             console.log("Inside add property") 
//             console.log("session: " , req.session.user)
//             console.log(req.body.address)  
//             console.log(req.body.headline)  
//             console.log(req.body.type)  
//             console.log(req.body.description)  
//             console.log(req.body.bedroom)  
//             console.log(req.body.accomodate)  
//             console.log(req.body.bathroom) 
//             console.log(req.body.images) 
//             console.log(req.body.startdate)  
//             console.log(req.body.enddate)  
//             console.log(req.body.baserate)  


//         var property = new Properties({
//             oemailid : req.session.user.emailid,
//             address : req.body.address,
//             headline : req.body.headline,
//             type : req.body.type,
//             description : req.body.description,
//             bedroom : req.body.bedroom,
//             accomodate : req.body.accomodate,
//             bathroom : req.body.bathroom,
//             availablestartdate : req.body.startdate,
//             availableenddate : req.body.enddate,
//             baserate : req.body.baserate,
//             picturelist : req.body.images
//         })
//                 property.save()
//                 .then((property) => {
//                     console.log("Property added : " + property);
//                     res.sendStatus(200).end();
//                 },(err) =>{
//                     res.sendStatus(400).end();
//                 }) 
// //     //=========Kafka============
// //     var msg = {
// //         oemailid : req.session.user.emailid,
// //         address : req.body.address,
// //         state : req.body.state,
// //         country : req.body.country,
// //         street : req.body.street,
// //         zipcode : req.body.zipcode,
// //         headline : req.body.headline,
// //         type : req.body.type,
// //         description : req.body.description,
// //         bedroom : req.body.bedroom,
// //         accomodate : req.body.accomodate,
// //         bathroom : req.body.bathroom,
// //         availablestartdate : req.body.startdate,
// //         availableenddate : req.body.enddate,
// //         baserate : req.body.baserate,
// //         picturelist : req.body.images
// //     }

// //     console.log("--Inside add property--");
// //     kafka.make_request('addproperty',msg, function(err,results){
// //     console.log('in result');
// //     console.log(results);
// //     if (err){
// //         console.log("Inside err");
// //         res.json({
// //             status:"error",
// //             msg:"System Error, Try Again."
// //         })
// //     } 
// //     else{
// //                 res.code = "200";
// //                 res.value = results.value;ENT
// //                 res.sendStatus(200).end();
// //         }
    
// // });

//  });

//Add event
  app.post('/postevent',function(req,res){
    //=================Without Kafka===============
            console.log("Inside create event") 
            console.log("session: " , req.session.user)
            console.log(req.body.eventname)  
            console.log(req.body.eventdescription)  
            console.log(req.body.eventdate)  
            console.log(req.body.starttime)  
            console.log(req.body.eventduration)  
            // console.log(req.body.eventvenue)  
            console.log(req.body.eventcitystate) 
            console.log(req.body.images) 
            console.log(req.body.eventzipcode)  
            console.log(req.body.eventcountry)   


        var event = new Events({
            oemailid : req.session.user.emailid,
            eventname : req.body.eventname,
            eventdescription : req.body.eventdescription,
            eventdate : req.body.eventdate,
            starttime : req.body.starttime,
            eventduration : req.body.eventduration,
            eventvenue : req.body.eventvenue,
            eventcitystate : req.body.eventcitystate,
            // eventstate : req.body.eventstate,
            eventzipcode : req.body.eventzipcode,
            eventcountry : req.body.eventcountry,
            picturelist : req.body.images
        })
                event.save()
                .then((event) => {
                    console.log("Event created : " + event);
                    res.sendStatus(200).end();
                },(err) =>{
                    res.sendStatus(400).end();
                }) 

 });



app.post('/searchevents',  async function(req,res){
    console.log("Inside search" + req.body.eventstartdate + req.body.eventcitystate );

      Events.find(
          {$and: [
                {eventcitystate : req.body.eventcitystate},
                {eventdate : {$gte : req.body.eventstartdate}}, 
            ]
        }, 
        function(err, events) 
        {
            if (err)
            {
                res.send(err);
            }
            else
            {
                console.log("Searched events " + events);
                res.status(200).send(JSON.stringify(events))
            }
        });
    
})

//Recommendeded events
app.post('/getevents',  async function(req,res){
    console.log("Inside search" + req.body.latitude + " " + req.body.longitude + req.session.user.emailid);

    const includeEvents = await Users.find
    ({
        emailid : req.session.user.emailid,
      },
       {pastevents : 1, _id: 0}
      )

      var includedEvents = (includeEvents[0].pastevents.replace(/ /g,''))
    //  console.log(includedEvents.replace(/ /g,''))
      var includeEventsArray = []
      includeEventsArray = includedEvents.split(',');
      console.log(includeEventsArray)
      
      Events.find(
        {_id : {$in : includeEventsArray}}, 
        function(err, events) 
        {
            if (err)
            {
                console.log(err)
                res.send(err);
            }
            else
            {
                console.log("Searched events " + events);
                res.status(200).send(JSON.stringify(events))
            }
        });
    
})

//Get events
app.get('/getevents',  function(req,res){

    Events.find({

      },
      function(err, events) 
      {
          if (err)
          {
              res.send(err);
          }
          else
          {
              console.log("Searched events " + events);
              res.status(200).send(JSON.stringify(events))
          }
      });
  
})

//Get events
app.get('/getcount',  function(req,res){

    Users.find({
        emailid : req.session.user.emailid
      },
      function(err, user) 
      {
          if (err)
          {
              res.send(err);
          }
          else
          {
              console.log("Current user " + user);
              res.status(200).send(JSON.stringify(user))
          }
      });
  
})


// //fetch particular property
// app.get('/fetchpropertydetails/:pid', function(req,res){
//     //===============Without Kafka ===================
//     console.log("inside fetch property details")
//     Properties.find(
//         {
//             _id : req.params.pid
//         }
//     )
//     .then((property)=>
//     {
//     console.log("Property fetched: " + property);
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     })
//     res.end(JSON.stringify(property));
//     },(err) => {
//     res.writeHead(400,{
//         'Content-Type' : 'text/plain'
//     })
//     res.end("Invalid property");
//     })
 
// //================Kafka=============================

// console.log("--Inside fetch properties--");
//     var msg = {
//         pid : req.params.pid
//     }
//     kafka.make_request('fetchpropertydetails',msg, function(err,results){
//         console.log('In result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.json({
//                 status:"error",
//                 msg:"System Error, Try Again."
//             })
//         } 
//         else{
//                     res.code = "200";
//                     res.value = results.value;
//                     res.send(JSON.stringify(results));
//             }
        
//     });

 //});

 //=====================Get particular event details===============
 app.get('/fetcheventdetails/:pid', function(req,res){
    //===============Without Kafka ===================
    console.log("inside fetch event details" + req.params.pid)
    Events.find(
        {
            _id : req.params.pid
        }
    )
    .then((event)=>
    {
    console.log("Event fetched: " + event);
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    })
    res.end(JSON.stringify(event));
    },(err) => {
    res.writeHead(400,{
        'Content-Type' : 'text/plain'
    })
    res.end("Invalid property");
    })

 })

app.post('/addBooking',function(req,res){
//===================Without Kafka=======================
    console.log("Inside Add Booking Request");
    console.log(req.body.pid);  
    console.log(req.session.user.emailid);
    console.log(req.body.oemailid);   
    console.log(req.body.start_date);  
    console.log(req.body.end_date);  
    console.log(req.body.accomodates);
    console.log(req.body.headline);  
    console.log(req.body.location);
    console.log(req.body.baserate);  

            var booking = new Bookings({
                oemailid : req.body.oemailid,
                temailid : req.session.user.emailid,
                bookedstartdate : req.body.start_date,
                bookedenddate : req.body.end_date,
                pid : req.body.pid,
                accomodates : req.body.accomodates,
                headline : req.body.headline,
                location : req.body.location,
                price : req.body.baserate
            })
    
            booking.save().then((booking) => {
                console.log("Add Booking : " + booking);
                res.status(200).json(booking);
            },(err) =>{
                res.status(400).end();
            })
 
// //=====================Kafka========================
// var msg = {
//     oemailid : req.body.oemailid,
//     temailid : req.session.user.emailid,
//     bookedstartdate : req.body.start_date,
//     bookedenddate : req.body.end_date,
//     pid : req.body.pid,
//     accomodates : req.body.accomodates,
//     headline : req.body.headline,
//     location : req.body.location,
//     price : req.body.baserate
// }

// console.log("--Inside add booking--");
//     kafka.make_request('addbooking',msg, function(err,results){
//     console.log('In results');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     } 
//     else{
//                 res.code = "200";
//                 res.value = results.value;
//                 console.log("Add Booking : " + JSON.stringify(results));
//                 res.status(200).json(results);
//         }
    
// });

 }); 

//Upload property photos
app.post('/photos', upload.array('selectedFile'), (req, res) => {
    var images = 'images';
    images =  req.files[0].filename;
    for(let i=1 ; i < req.files.length  ; i++)
    {
        console.log("Req : ", req.files[i].filename);
        images = images + "," + req.files[i].filename; 
    }
    console.log(images)
        
    res.end(images);

});


//Fetch photos

app.post('/download/:file(*)',(req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads',file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(base64img);
  });


  //Fetch my trips
//   app.get('/getmytrips', function(req,res){
//     //=========Without kafka=========
//     /*   console.log("Get trips")
//     var temailid = req.session.user.emailid;

//     Bookings.find
//     (
//         {temailid : temailid}, 
//         function(err, mytrips) 
//         {
//             if (err)
//             {
//                 res.send(err);
//             }
//             else
//             {
//                 console.log("My Trips: " + mytrips);
//                 res.status(200).send(JSON.stringify(mytrips))
//             }
//         }); */
//     //============Kafka==============
//     var msg = {
//         temailid : req.session.user.emailid
//     }

//     console.log("--Inside get my trips--");
//     kafka.make_request('getmytrips',msg, function(err,results){
//     console.log('In results');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     } 
//     else{
//                 res.code = "200";
//                 res.value = results.value;
//                 console.log("My trips : " + results);
//                 res.status(200).json(results);
//         }
    
// });
    

// })


//Get owner dashbord
// app.get('/getownerdashboard', function(req,res){
//     //=============Without kafka===========
//     /* console.log("Inside Get Owner Dashboard")
//     var oemailid = req.session.user.emailid;
//     console.log(oemailid);

//     Bookings.find({oemailid : oemailid}, 
//         function(err, bookings) 
//         {
//             if (err)
//             {
//                 res.send(err);
//             }
//             else
//             {
//                 console.log("Owner dashboard bookings : " + bookings);
//                 res.status(200).send(JSON.stringify(bookings))
//             }
//         }); */

//     //==============Kafka========================
//     var msg = {
//         oemailid : req.session.user.emailid
//     }

//     console.log("--Inside owner dashboard--");
//     kafka.make_request('ownerdashboard',msg, function(err,results){
//     console.log('In results');
//     console.log(results);
//     if (err){
//         console.log("Inside err");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     } 
//     else{
//                 res.code = "200";
//                 res.value = results.value;
//                 console.log("Owner Dashboard : " + results);
//                 res.status(200).json(results);
//         }
    
// });

// })

/* //Owner 
app.get('/getusertype/:emailid', function(req,res){
    console.log("Inside Get User Type");
    console.log(req.params.emailid);
    var sql = "SELECT usertype FROM homeaway_usertable WHERE emailid = "
                + mysql.escape(req.params.emailid) ;
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})
 */

//send  message
// app.post('/sendmessage',function(req,res){
// var tid = req.body.tid;
// console.log("tid" + tid + "first?" + req.body.firstFlag);
// if(req.body.firstFlag == true)
// {

//     var message = new Messages({
//         oemailid : req.body.oemailid,
//         temailid : req.session.user.emailid,
//         messagethread : req.body.messagethread,
//         headline : req.body.headline,
//         address : req.body.address
//     })

//     message.save().then((msg) => {
//         console.log("Message sent : " + JSON.stringify(msg));
//         res.code = "200";
//         res.sendStatus(200).end();
//     },(err) =>{
//         res.sendStatus(400).end();
//     })
// }
// else if (req.body.firstFlag == false)
// {
//     Messages.findOneAndUpdate(
//         {
//             _id: tid,
//         },
//         { $push: { messagethread: req.body.messagethread } },
//         { new: true, upsert: true },
//         function (err, msg) { // callback
//             if (err) {
//                 // handle error
//                 console.log(err);
//                 res.code = "400";
//                 res.status(400).end();
//             } else {
//                // handle document
//                console.log("Message thread updated " + msg);
//                res.code = "200";
//                res.value = msg
//                res.end(JSON.stringify(msg));
//             }
//         }
//     );
// }
// });


//Get Message Thread
// app.get('/getmessagelist', function(req,res){
//     console.log("Get Message Thread of user" + req.session.user.emailid + " " + req.session.user.usertype)
//     var emailid = req.session.user.emailid;
//     if(req.session.user.usertype == "owner")
//     {
//     Messages.find({
//         oemailid: emailid
//     }, function(err,messagelist){
//         console.log("Inside owner's get messagelist")
//         if (err) {
//             console.log("err");
//             res.code = "400";
//             res.value = "Oops! Something went wrong";
//             console.log(res.value);
//             res.sendStatus(400).end(); 
//         } else{
//             console.log("success")
//             res.code = "200";
//             res.value = messagelist;
//             console.log("Message fetched" + JSON.stringify(messagelist));
//             res.send(JSON.stringify(messagelist));
//         }
//     })
// }
// else if (req.session.user.usertype == "traveler")
// {
//     console.log("Inside traveler's get messagelist")
//     Messages.find({
//         temailid: emailid
//     }, function(err,messagelist){
//         console.log("inside Find one")
//         if (err) {
//             console.log("err");
//             res.code = "400";
//             res.value = "Oops! Something went wrong";
//             console.log(res.value);
//             res.sendStatus(400).end(); 
//         } else{
//             console.log("success")
//             res.code = "200";
//             res.value = messagelist;
//             console.log("Message list fetched" + JSON.stringify(messagelist));
//             res.send(JSON.stringify(messagelist));
//         }
//     })  
// }
// })


//fetch particular message


/* // Inbox update
app.post('/updatemessage',function(req,res){
    console.log("Inside update message")

        var emailid = req.session.user.emailid;
        var messagethread = req.body.message;
        console.log(messagethread);

        Messages.findOneAndUpdate(
            {
                owneremail: ownerEmailval,
                traveleremail: req.body.traveleremail
            },
            { $push: { travelermessage: req.body.message } },
            { new: true, upsert: true },
            function (err, msg) { // callback
                if (err) {
                    // handle error
                    console.log(err);
                    res.code = "400";
                    res.sendStatus(400).end();
                } else {
                   // handle document
                   console.log("Message thread updated " + msg);
                   res.code = "200";
                   res.sendStatus(200).json(msg);
                }
            }
        );
});
 */


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");