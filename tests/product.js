// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let should = chai.should();
// const faker = require('faker');
// const fs = require('fs');

// const getDomain = require('../domain');
// const domain = getDomain();

// chai.use(chaiHttp);
// chai.use(require('chai-like'));
// chai.use(require('chai-things')); // Don't swap these two


// describe('Product', () => {
//     const username1 = faker.internet.userName();
//     let token;

//     const productName = faker.lorem.words();
//     let productId;
//     let founder;

//     describe('/Post register', () => {
//         it('it should POST username, password, profile', (done) => {
//             chai.request(domain)
//                 .post('/register')
//                 .send({
//                     "username": username1,
//                     "password": "1",
//                     "displayname": "CMC Institute of Science and Technology",
//                     "phonenumber": "024 710 65555",
//                     "description": "CIST được tổ chức theo mô hình hoạt động ma trận với tính linh hoạt cao và hướng thị trường. Với hạ tầng phòng Lab hiện đại, hệ thống DataCenter và máy chủ có hiệu năng cao, Trung tâm Sáng tạo và hệ thống đào tạo chuyên nghiệp, CIST đã hình thành nên một hệ sinh thái sáng tạo hỗ trợ toàn diện cho hoạt động nghiên cứu ứng dụng.",
//                     "address": "Tầng 4 - Tòa nhà CMC, 11 Duy Tân, Cầu Giấy, Hà Nội."
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property("success").eql("Logged");
//                     res.body.should.have.nested.property("message.success").eql(true);
//                     res.body.should.have.nested.property("message.message.success").eql(true);
//                     done();
//                 });
//         });
//     });


//     describe('/Post login', () => {
//         it('it should POST username and password', (done) => {
//             chai.request(domain)
//                 .post('/login')
//                 .send({
//                     "username": username1,
//                     "password": "1"
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property("success").eql(true);
//                     res.body.should.have.nested.property("message.message.userId");
//                     res.body.should.have.nested.property("message.message.displayname");
//                     res.body.should.have.nested.property("message.message.phonenumber");
//                     res.body.should.have.nested.property("message.message.address");
//                     res.body.should.have.nested.property("message.message.description");
//                     res.body.should.have.nested.property("message.message.url");
//                     res.body.should.have.nested.property("message.token");
//                     token = res.body.message.token;
//                     done();
//                 });
//         });
//     });

//     describe('/Post create product without image, video', () => {
//         it('it should POST product info', (done) => {
//             let dt = new Date();
//             dt.setDate(dt.getDate() - 10);
//             let address = faker.address.streetAddress();
//             let latitude = faker.address.latitude();
//             let longitude = faker.address.longitude();
//             let description = faker.lorem.sentences();
//             let status = faker.lorem.words(2);
//             let uuid = faker.random.uuid();

//             chai.request(domain)
//                 .post('/contract/create')
//                 .set('Authorization', 'bearer ' + token)
//                 .send({
//                     "tensanpham": productName,
//                     "thoigian": dt.toISOString(),
//                     "diadiem": address,
//                     "toado": latitude + "," + longitude,
//                     "mota": description,
//                     "trangthai": status,
//                     "formIDmoinhat": uuid,
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(201);
//                     res.body.should.have.property("success").eql(true);
//                     res.body.should.have.nested.property("message.context.id");
//                     res.body.should.have.nested.property("message.context.tensanpham").eql(productName);
//                     res.body.should.have.nested.property("message.context.nhasanxuat");
//                     res.body.should.have.nested.property("message.context.thoigian").eql(dt.toISOString());
//                     res.body.should.have.nested.property("message.context.diadiem").eql(address);
//                     res.body.should.have.nested.property("message.context.toado").eql(latitude + "," + longitude);
//                     res.body.should.have.nested.property("message.context.mota").eql(description);
//                     res.body.should.have.nested.property("message.context.trangthai").eql(status);
//                     res.body.should.have.nested.property("message.context.hashvalue");
//                     res.body.should.have.nested.property("message.context.HashValueOffchain");
//                     res.body.should.have.nested.property("message.context.hashpbs");
//                     res.body.should.have.nested.property("message.context.HashPb");
//                     res.body.should.have.nested.property("message.context.desc").that.is.an('array');
//                     productId = res.body.message.context.id;
//                     founder = res.body.message.context.nhasanxuat;
//                     done();
//                 });
//         });
//     });

//     describe('/Post create product with images, video desc', () => {
//         let formId = faker.random.uuid();
//         it('it should POST product images, videos', (done) => {
//             chai.request(domain)
//                 .post('/offchain/uploadDescriptions')
//                 .set('Authorization', 'bearer ' + token)
//                 .attach('descriptions', fs.readFileSync('assets/background-1.jpg'), 'background-1.jpg')
//                 .field("formID", formId)
//                 .field("contentType", "image")
//                 .field("width", 5472)
//                 .field("height", 3648)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property("success").eql(true);
//                     res.body.should.have.nested.property("message.success").eql(true);
//                     done();
//                 });
//             chai.request(domain)
//                 .post('/offchain/uploadDescriptions')
//                 .set('Authorization', 'bearer ' + token)
//                 .attach('descriptions', fs.readFileSync('assets/background-2.jpg'), 'background-2.jpg')
//                 .field("formID", formId)
//                 .field("contentType", "image")
//                 .field("width", 3992)
//                 .field("height", 2242)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property("success").eql(true);
//                     res.body.should.have.nested.property("message.success").eql(true);
//                     done();
//                 });
//             chai.request(domain)
//                 .post('/offchain/uploadDescriptions')
//                 .set('Authorization', 'bearer ' + token)
//                 .attach('descriptions', fs.readFileSync('assets/sample.mp4'), 'sample.mp4')
//                 .field("formID", formId)
//                 .field("contentType", "video")
//                 .field("width", 1920)
//                 .field("height", 1080)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property("success").eql(true);
//                     res.body.should.have.nested.property("message.success").eql(true);
//                     done();
//                 });
//         });
//         it('it should POST product meta data', (done) => {
//             let dt = new Date();
//             dt.setDate(dt.getDate() - 10);
//             let address = faker.address.streetAddress();
//             let latitude = faker.address.latitude();
//             let longitude = faker.address.longitude();
//             let description = faker.lorem.sentences();
//             let status = faker.lorem.words(2);

//             chai.request(domain)
//                 .post('/contract/create')
//                 .set('Authorization', 'bearer ' + token)
//                 .send({
//                     "tensanpham": productName,
//                     "thoigian": dt.toISOString(),
//                     "diadiem": address,
//                     "toado": latitude + "," + longitude,
//                     "mota": description,
//                     "trangthai": status,
//                     "formIDmoinhat": formId,
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(201);
//                     res.body.should.have.property("success").eql(true);
//                     res.body.should.have.nested.property("message.context.id");
//                     res.body.should.have.nested.property("message.context.tensanpham").eql(productName);
//                     res.body.should.have.nested.property("message.context.nhasanxuat");
//                     res.body.should.have.nested.property("message.context.thoigian").eql(dt.toISOString());
//                     res.body.should.have.nested.property("message.context.diadiem").eql(address);
//                     res.body.should.have.nested.property("message.context.toado").eql(latitude + "," + longitude);
//                     res.body.should.have.nested.property("message.context.mota").eql(description);
//                     res.body.should.have.nested.property("message.context.trangthai").eql(status);
//                     res.body.should.have.nested.property("message.context.hashvalue");
//                     res.body.should.have.nested.property("message.context.HashValueOffchain");
//                     res.body.should.have.nested.property("message.context.hashpbs");
//                     res.body.should.have.nested.property("message.context.HashPb");
//                     res.body.should.have.nested.property("message.context.desc").that.is.an('array');
//                     res.body.should.have.nested.property("message.context.desc")
//                         .should.all.have.property('width');
//                     res.body.should.have.nested.property("message.context.desc")
//                         .should.all.have.property('height');
//                     res.body.should.have.nested.property("message.context.desc")
//                         .should.all.have.property('type');
//                     res.body.should.have.nested.property("message.context.desc")
//                         .should.contain.a.thing.with.property("originUrl");
//                     res.body.should.have.nested.property("message.context.desc")
//                         .should.contain.a.thing.with.property("thumbnailUrl");


//                     productId = res.body.message.context.id;
//                     founder = res.body.message.context.nhasanxuat;
//                     done();
//                 });
//         });
//     });


//     describe('/Post update product', () => {
//         it('it should POST product info', (done) => {
//             let dt = new Date();
//             dt.setDate(dt.getDate() - 5);
//             let address = faker.address.streetAddress();
//             let latitude = faker.address.latitude();
//             let longitude = faker.address.longitude();
//             let description = faker.lorem.sentences();
//             let status = faker.lorem.words(2);
//             let uuid = faker.random.uuid();

//             chai.request(domain)
//                 .post('/contract/update')
//                 .set('Authorization', 'bearer ' + token)
//                 .send({
//                     "id": productId,
//                     "nhasanxuat": founder,
//                     "thoigian": dt.toISOString(),
//                     "diadiem": address,
//                     "toado": latitude + "," + longitude,
//                     "mota": description,
//                     "trangthai": status,
//                     "formIDmoinhat": uuid,
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property("success").eql(true);
//                     res.body.should.have.nested.property("message.context.id");
//                     res.body.should.have.nested.property("message.context.tensanpham").eql(productName);
//                     res.body.should.have.nested.property("message.context.nhasanxuat").eql(founder);
//                     res.body.should.have.nested.property("message.context.thoigian").eql(dt.toISOString());
//                     res.body.should.have.nested.property("message.context.diadiem").eql(address);
//                     res.body.should.have.nested.property("message.context.toado").eql(latitude + "," + longitude);
//                     res.body.should.have.nested.property("message.context.mota").eql(description);
//                     res.body.should.have.nested.property("message.context.trangthai").eql(status);
//                     res.body.should.have.nested.property("message.context.hashvalue");
//                     res.body.should.have.nested.property("message.context.HashValueOffchain");
//                     res.body.should.have.nested.property("message.context.hashpbs");
//                     res.body.should.have.nested.property("message.context.HashPb");
//                     done();
//                 });
//         });
//     });
// });