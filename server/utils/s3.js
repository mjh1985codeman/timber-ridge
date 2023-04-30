const {PutObjectCommand, S3Client} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();


const params = {
    BucketName: 'tr-prop-bucket',
    region: 'us-east-1',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
};

const s3Client = new S3Client(params);

const s3Actions = {
    getURL: (propId) => {
        const fileName = `${propId}.json`
        const command = new PutObjectCommand({ Bucket: 'tr-prop-bucket', region: 'us-east-1', Key: fileName, contenttype: 'application/json' });
        return getSignedUrl(s3Client, command);
      }
};

module.exports = s3Actions;