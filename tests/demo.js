const chai = require('chai');


// chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

describe('sum()', function () {
    it('adds two numbers', function () {
        chai.expect([{
            width: 1290,
            height: 720,
            type: "image",
            url: "good/sadsadsa"
        }, {
            width: 1290,
            height: 720,
            type: "video",
            url: "good/sadsadsa"
        }])
        .to.be.an('array').eventually.include.all.members('url');
    });


});