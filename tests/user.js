
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const faker = require('faker');
const fs = require('fs');

const getDomain = require('../domain');
const domain = getDomain();

chai.use(chaiHttp);


describe('User', () => {
    const username = faker.internet.userName();
    let token;

    describe('/Post register', () => {
        it('it should POST username, password, profile', (done) => {
            chai.request(domain)
                .post('/register')
                .send({
                    "username": username,
                    "password": "1",
                    "displayname": "CMC Institute of Science and Technology",
                    "phonenumber": "024 710 65555",
                    "description": "CIST được tổ chức theo mô hình hoạt động ma trận với tính linh hoạt cao và hướng thị trường. Với hạ tầng phòng Lab hiện đại, hệ thống DataCenter và máy chủ có hiệu năng cao, Trung tâm Sáng tạo và hệ thống đào tạo chuyên nghiệp, CIST đã hình thành nên một hệ sinh thái sáng tạo hỗ trợ toàn diện cho hoạt động nghiên cứu ứng dụng.",
                    "address": "Tầng 4 - Tòa nhà CMC, 11 Duy Tân, Cầu Giấy, Hà Nội."
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("success").eql("Logged");
                    res.body.should.have.nested.property("message.success").eql(true);
                    res.body.should.have.nested.property("message.message.success").eql(true);
                    done();
                });
        });
    });


    describe('/Post login', () => {
        it('it should POST username and password', (done) => {
            chai.request(domain)
                .post('/login')
                .send({
                    "username": username,
                    "password": "1"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.nested.property("message.message.userId");
                    res.body.should.have.nested.property("message.message.displayname");
                    res.body.should.have.nested.property("message.message.phonenumber");
                    res.body.should.have.nested.property("message.message.address");
                    res.body.should.have.nested.property("message.message.description");
                    res.body.should.have.nested.property("message.message.url");
                    res.body.should.have.nested.property("message.token");
                    token = res.body.message.token;
                    done();
                });
        });
    });


    describe('/Post update profile', () => {
        it('it should POST profile of user', (done) => {
            chai.request(domain)
                .post('/user/edit')
                .set('Authorization', 'bearer ' + token)
                .attach('avatar', fs.readFileSync('assets/avatar5.png'), 'avatar.png')
                .field("displayname", "Tên tổ chức")
                .field("phonenumber", "23423423432423")
                .field("description", "Mô tả công ty")
                .field("address", "Địa chỉ nè")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.nested.property("message.displayname").eql("Tên tổ chức");
                    res.body.should.have.nested.property("message.phonenumber").eql("23423423432423");
                    res.body.should.have.nested.property("message.description").eql("Mô tả công ty");
                    res.body.should.have.nested.property("message.address").eql("Địa chỉ nè");
                    res.body.should.have.nested.property("message.url");
                    done();
                });
        });
    });


    describe('/GET profile', () => {
        it('it should GET profile of user', (done) => {
            chai.request(domain)
                .get('/user')
                .set('Authorization', 'bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("displayname").eql('Tên tổ chức');
                    res.body.should.have.property("phonenumber").eql('23423423432423');
                    res.body.should.have.property("address").eql('Địa chỉ nè');
                    res.body.should.have.property("description").eql('Mô tả công ty');
                    res.body.should.have.property("url");

                    done();
                });
        });
    });

});