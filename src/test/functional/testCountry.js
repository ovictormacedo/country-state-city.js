process.env.NODE_ENV = 'test';
process.env.APP_LOG_PATH="./cep.log"

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const sinon = require("sinon")
const { router } = require("../../bootstrap/router")
let { app } = require('../../bootstrap/app')
const countryDao = require("../../dao/country")

chai.use(chaiHttp);

describe('country', () => {
    before(() => {
        router(app())
    });

    afterEach(function () {
        sinon.restore();
    });

    const getCountriesStubValue = [
        {
            "id": 1,
            "name": "Afghanistan",
            "iso3": "AFG",
            "iso2": "AF",
            "phonecode": "93",
            "capital": "Kabul",
            "currency": "AFN",
            "currency_symbol": "؋",
            "tld": ".af",
            "native": "افغانستان",
            "region": "Asia",
            "subregion": "Southern Asia",
            "timezones": "[{zoneName:'Asia\/Kabul',gmtOffset:16200,gmtOffsetName:'UTC+04:30',abbreviation:'AFT',tzName:'Afghanistan Time'}]",
            "latitude": "33.00000000",
            "longitude": "65.00000000",
            "emoji": "🇦🇫",
            "emojiu": "U+1F1E6 U+1F1EB"
        },
    ];

    describe('Get country', () => {
        it('should GET all the countries', () => {
            const stub = sinon.stub(countryDao, "getCountries").returns(getCountriesStubValue);
            chai.request(app())
                .get('/country')
                .end((err, res) => {
                    expect(stub.calledOnce).to.be.true;
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(1)
                });
        });
    });
});