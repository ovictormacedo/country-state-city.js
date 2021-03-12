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
const cityDao = require("../../dao/city")

chai.use(chaiHttp);

describe('city', () => {
    beforeEach(() => {
        router(app())
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
    
    describe('/GET city', () => {
        const stub = sinon.stub(cityDao, "getCitiesByStateId").returns(
            getCitiesByStateIdStubValue
        );
        it('it should GET cities by state id', (done) => {
            chai.request(app())
                .get('/country/1/state/1/city')
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