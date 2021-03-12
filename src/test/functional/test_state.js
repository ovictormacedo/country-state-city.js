process.env.NODE_ENV = 'test';
process.env.PORT = 3000
process.env.APP_LOG_PATH="./cep.log"

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const sinon = require("sinon")
const { webServer } = require("../../bootstrap/server")
const { router } = require("../../bootstrap/router")
let { app } = require('../../bootstrap/app')
const stateDao = require("../../dao/state")

chai.use(chaiHttp);

describe('state', () => {
    beforeEach(() => {
        router(app())
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
    
    describe('/GET state', () => {
        const stub = sinon.stub(stateDao, "getStatesByCountryId").returns(
            getStatesByCountryIdStubValue
        );
        it('it should GET states by country id', (done) => {
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
    });
});