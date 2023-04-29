const AWS = require('aws-sdk');
require('dotenv').config();


const params = {
    Region: 'us-east-1',
    BucketName: 'tr-prop-bucket',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
};

const s3Client = new AWS.S3(params);

const s3Actions = {
    getURL: (propId) => {
        const fileName = `${propId}.json`
        const s3bucketUrl = s3Client.getSignedUrl("putObject", {
            Bucket: params.BucketName,
            Key: fileName,
            Expires: 60,
            ContentType: 'application/json'
        });
        return s3bucketUrl
    }
};

module.exports = s3Actions;