module.exports = function (input) {

};


var crypto = require('crypto');

//获取所有的加密算法
console.log(crypto.getHashes());

//创建md5加密
var md5 = crypto.createHash('md5');

//向算法中输入数据(可以多次调用)
md5.update('1');
md5.update('2');

//进行加密
// C20AD4D76FE97759AA27A0C99BFF6710
// c20ad4d76fe97759aa27a0c99bff6710
var result = md5.digest('hex');

// 32 32*31*30*29*28*27
// 6  1
// c4ca4238a0b923820dcc509a6f75849b
// C4CA4238A0B923820DCC509A6F75849B
// c4ca4238a0b923820dcc509a6f75849b
console.log(result);




/*
[ 'DSA',
    'DSA-SHA',
    'DSA-SHA1',
    'DSA-SHA1-old',
    'RSA-MD4',
    'RSA-MD5',
    'RSA-MDC2',
    'RSA-RIPEMD160',
    'RSA-SHA',
    'RSA-SHA1',
    'RSA-SHA1-2',
    'RSA-SHA224',
    'RSA-SHA256',
    'RSA-SHA384',
    'RSA-SHA512',
    'dsaEncryption',
    'dsaWithSHA',
    'dsaWithSHA1',
    'dss1',
    'ecdsa-with-SHA1',
    'md4',
    'md4WithRSAEncryption',
    'md5',
    'md5WithRSAEncryption',
    'mdc2',
    'mdc2WithRSA',
    'ripemd',
    'ripemd160',
    'ripemd160WithRSA',
    'rmd160',
    'sha',
    'sha1',
    'sha1WithRSAEncryption',
    'sha224',
    'sha224WithRSAEncryption',
    'sha256',
    'sha256WithRSAEncryption',
    'sha384',
    'sha384WithRSAEncryption',
    'sha512',
    'sha512WithRSAEncryption',
    'shaWithRSAEncryption',
    'ssl2-md5',
    'ssl3-md5',
    'ssl3-sha1',
    'whirlpool' ]*/
