process.env.NODE_ENV = 'test';
process.env.APP_LOG_PATH="./cep.log"

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const sinon = require("sinon")
const { router } = require("../../bootstrap/router")
let { app } = require('../../bootstrap/app')
const cityDao = require("../../dao/city")

chai.use(chaiHttp);

describe('city', () => {
    before(() => {
        router(app());
    });

    afterEach(() => {
        sinon.restore();
    });

    const getCitiesByStateIdStubValue = [
        {
            "id": 38592,
            "name": "Alaba Special Wereda",
            "state_id": 1,
            "state_code": "SN",
            "country_id": 70,
            "country_code": "ET",
            "latitude": "7.45347000",
            "longitude": "38.21189000"
        },
    ];
    
    describe("Get city", () => {
        it('it should GET cities by state id', (done) => {
            sinon.stub(cityDao, "getCitiesByStateId").returns(
                getCitiesByStateIdStubValue
            );
            chai.request(app())
                .get('/api/cep/country/1/state/1/city')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(1);
                    done();
                });
        });
            
        it('should not return cities of the unknown state', (done) => {
            sinon.stub(cityDao, "getCitiesByStateId").returns(null);
            chai.request(app())
                .get('/api/cep/country/1/state/123123123123123/city')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.equal("Cities were not found for 123123123123123");
                    done();
                })
        });

        it('should return validation error', (done) => {
            chai.request(app())
                .get('/api/cep/country/1/state/111111111111111111/city')
                .end((err, res) => {
                    res.text.should.be.equal('{"errors":[{"value":"111111111111111111","msg":"Invalid value","param":"stateId","location":"params"}]}');
                    res.should.have.status(400);
                    done();
                })
        });
    });
});