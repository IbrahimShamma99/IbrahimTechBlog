const request = require("supertest");
//const request = require("request-promise-native");
const App = require("../server");
//const { Routes } = require("../../constants/constants");
var {
    TestRoutes,
    ValidUser,
    MistakenlyWrittenValidUser,
    NotValidUser
} = require("../../constants/TestConstants");
var expect = require('chai').expect;
const randomizer = Math.random();


//NOTE specs with no expectations within just pass.

describe('Registeration Tests', () => {

    //SECTION Fine Registeration
    it(TestNames.Regiseration_Case1, (done) => {
        request(App)
            .post(TestRoutes.signup)
            .send(ValidUser)
            .end(function(err, response) {
                if (err) {
                    return err;
                }

                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    //SECTION Bad Registeration
    it(TestNames.Regiseration_Case2, function(done) {
        request(App)
            .post(TestRoutes.signup).send({ NotValidUser })
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(422);
                done();
            });
    });
});