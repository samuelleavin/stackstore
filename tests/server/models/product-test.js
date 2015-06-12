var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');


require('../../../server/db/models/product');

var Product = mongoose.model('Product');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    describe('on creation', function () {
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

        it('should save to database', function (done) {
            return Product.findOne({ name: 'Royal Blue Shirt' }).exec().then(function (product) {
                expect(product.name).to.be.equal('Royal Blue Shirt');
                    done();
            })
        })
    });
});