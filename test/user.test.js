const request = require("supertest");
const app = require("../server");
var expect = require('chai').expect;
var {
    TestRoutes,
    ValidUser,
    MistakenlyWrittenValidUser,
    NotValidUser
} = require("../constants/TestConstants");

//NOTE specs with no expectations within just pass.
describe('Registeration Tests', () => {

    //SECTION Fine Registeration
    it("Fine Registeration", (done) => {
        request(app)
            .post(TestRoutes.Register)
            .send(ValidUser)
            .end(
                function(err, response) {
                    if (err) {
                        return err;
                    }
                    expect(response.statusCode).to.equal(200);
                    done();
                });
    });

    //SECTION Bad Registeration
    it("Bad Registeration", function(done) {
        request(app)
            .post(TestRoutes.Register)
            .send(NotValidUser)
            .end(function(err, response) {
                if (err) {
                    return err;
                }
                expect(response.statusCode).to.equal(422);
                done();
            });
    });
});