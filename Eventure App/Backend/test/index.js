var chai = require('chai'), chaiHttp = require('chai-http');
var should = require('chai').should()

chai.use(chaiHttp);

var expect = chai.expect;

/* it("Should check credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/login')
    .send({ "emailid": "admin", "password" : ""})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
}) */

it("Check if search results match and return status code 200", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/searchproperties')
    .send({ "destination": "Address2", "start_date" : "01-02-2018", "end_date" : "01-04-2018", "accomodates" : "3"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Check if user profile is being returned", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/getProfile/admin')
    .end(function(err, res) {
        should.not.exist(err)
        should.exist(res.body);
        done();
    });
})

it("Should check if properties are being returned", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/fetchpropertydetails/12')
    .end(function(err, res) {
        should.not.exist(err)
        should.exist(res.body);
        done();
    });
})

it("Should check if my trips are being returned", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/getmytrips/nuts@gmail.com')
    .end(function(err, res) {
        should.not.exist(err)
        should.exist(res.body);
        done();
    });
})

it("Should check if owner details are being returned", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/getownerdashboard/mugdha@gmail.com')
    .end(function(err, res) {
        should.not.exist(err)
        should.exist(res.body);
        done();
    });
})