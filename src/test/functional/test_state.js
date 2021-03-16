process.env.NODE_ENV = 'test';
process.env.PORT = 3000
process.env.APP_LOG_PATH="./cep.log"

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const sinon = require("sinon")
const { router } = require("../../bootstrap/router")
let { app } = require('../../bootstrap/app')
const stateDao = require("../../dao/state")

chai.use(chaiHttp);

describe('state', () => {
    beforeEach(() => {
        router(app())
    });

    afterEach(function () {
        sinon.restore();
    });

    const getStatesByCountryIdStubValue = [
        {
            "id": 3901,
            "name": "Badakhshan",
            "country_id": 1,
            "country_code": "AF",
            "state_code": "BDS",
            "latitude": "36.73477250",
            "longitude": "70.81199530"
        },
    ];
    
    describe('Get state', () => {
        it('should GET states by country id', (done) => {
            const stub = sinon.stub(stateDao, "getStatesByCountryId").returns(
                getStatesByCountryIdStubValue
            );
            chai.request(app())
                .get('/country/1/state')
                .end((err, res) => {
                    expect(stub.calledOnce).to.be.true;
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(1)
                    done();
                });
        });

        it('should not return states of the unknown state', (done) => {
            const stub = sinon.stub(stateDao, "getStatesByCountryId").returns(null);
            chai.request(app())
                .get('/country/123123123123123/state')
                .end((err, res) => {
                    expect(stub.calledOnce).to.be.true;
                    res.should.have.status(400);
                    res.text.should.be.equal("States were not found for 123123123123123")
                    done();
                });
        });

        it('should return validation error', (done) => {
            const stub = sinon.stub(stateDao, "getStatesByCountryId").returns(null);
            chai.request(app())
                .get('/country/111111111111111111/state')
                .end((err, res) => {
                    console.log(res.text)
                    res.should.have.status(400);
                    res.text.should.be.equal('{"errors":[{"value":"111111111111111111","msg":"Invalid value","param":"countryId","location":"params"}]}')
                    done();
                });
        });
    });
});