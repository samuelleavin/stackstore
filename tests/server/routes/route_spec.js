var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var supertest = require('supertest');

require('../../../server/db/models/product'); // gives access to Product model

var ourExpressApp = require('../../../server/app');
var app = supertest(ourExpressApp);

var Product = mongoose.model('Product');

describe('http requests', function() {

    beforeEach(function (done) {
        Product.remove({}, done);
    });

    beforeEach(function (done) {
            Product.create({
                sku: 123456,
                name: "Royal Blue Shirt",
                category: "T-shirt",
                type: "Tops",
                price: 18
            }, done);
    });

    describe('GET /', function() {

        it('should get 200 on index', function (done) {
            app.get('/').expect(200, done);
        });

    });
});