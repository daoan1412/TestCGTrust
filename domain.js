module.exports = function getDomain() {
    if (process.env.NODE_ENV == "production") {
        return 'http://124.158.1.126:9081';
    } else {
        return 'http://localhost:9081';
    }
}