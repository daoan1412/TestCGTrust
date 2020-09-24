let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const faker = require('faker');
const fs = require('fs');

const getDomain = require('../domain');
const domain = getDomain();

chai.use(chaiHttp);


describe('Product', () => {
    const username1 = faker.internet.userName();
    let token;

    const productName = faker.lorem.words();

    describe('/Post register', () => {
        it('it should POST username, password, profile', (done) => {
            chai.request(domain)
                .post('/register')
                .send({
                    "username": username1,
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
                    "username": username1,
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

    describe('/Post create product', () => {
        it('it should POST product info', (done) => {
            let dt = new Date();
            dt.setDate( dt.getDate() - 10 );
            let address = faker.address.streetAddress();
            let latitude = faker.address.latitude();
            let longitude = faker.address.longitude();
            let description = faker.lorem.sentences();
            let status = faker.lorem.words(2);
            let uuid = faker.random.uuid();

            chai.request(domain)
                .post('/contract/create')
                .set('Authorization', 'bearer ' + token)
                .send({
                    "tensanpham": productName,
                    "thoigian": dt.toISOString(),
                    "diadiem": address,
                    "toado": latitude + "," + longitude,
                    "mota": description,
                    "trangthai": status,
                    "formIDmoinhat": uuid,
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.nested.property("message.context.id");
                    res.body.should.have.nested.property("message.context.tensanpham").eql(productName);
                    res.body.should.have.nested.property("message.context.nhasanxuat");
                    res.body.should.have.nested.property("message.context.thoigian").eql(dt.toISOString());
                    res.body.should.have.nested.property("message.context.diadiem").eql(address);
                    res.body.should.have.nested.property("message.context.toado").eql(latitude + "," + longitude);
                    res.body.should.have.nested.property("message.context.mota").eql(description);
                    res.body.should.have.nested.property("message.context.trangthai").eql(status);
                    res.body.should.have.nested.property("message.context.hashvalue");
                    res.body.should.have.nested.property("message.context.HashValueOffchain");
                    res.body.should.have.nested.property("message.context.hashpbs");
                    res.body.should.have.nested.property("message.context.HashPb");
                    done();
                });
        });
    });
});