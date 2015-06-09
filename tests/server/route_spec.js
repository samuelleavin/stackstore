var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/app/routes/routes');
//this require only gets the directory, do we 
//need to grab specific files? like below?
//require('../../../server/db/models/user');


var User = mongoose.model('User');

describe('http requests', function() {

    beforeEach(function (done) {
        Page.remove({}, done);
    });

    beforeEach(function (done) {
        Page.create({
            title: 'Anolis carolinensis',
            body: 'Small dewlapping lizard native to the southeastern USA.',
            tags: ['lizard', 'USA']
        }, done);
    });

    describe('GET /', function() {

        it('should get 200 on index', function (done) {
            app.get('/').expect(200, done);
        });

    });