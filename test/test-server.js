const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

describe('API', function() {

    it('should 200 on GET requests', function() {
        return chai.request('https://powerful-caverns-35930.herokuapp.com')
            .get('/beerNode/cQMfwv')
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
        });
    });
});
