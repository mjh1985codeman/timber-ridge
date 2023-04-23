const AWS = require("@aws-sdk/client-s3");
const crypto = require('crypto');
const {promisify} = require("util");
const randomBytes = promisify(crypto.randomBytes);

const region = 'us-east-1';
const bucketName = 'tr-prop-bucket';
const s3keyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET;

const getS3 = async () => {
    const s3 = new AWS.S3(
        {
        region, 
        s3keyId,
        secretAccessKey,
        signatureVersion: 'v4'
    });

    console.log('s3', s3);
    
    async function getUploadURL() {
        const rawBytes = await randomBytes(16);
        const objName = rawBytes.toString('hex');
    
        const uploadParams = ({
            Bucket: bucketName,
            Key: objName,
            Expires: 60
        });
    
        const uploadURL = await s3.getSignedUrl('putObj', uploadParams);
        return uploadURL;
    };
    getUploadURL();
};

module.exports = getS3;

