const S3 = require('aws-sdk/clients/s3');
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const params = {
    Region: 'us-east-1',
    BucketName: 'tr-prop-bucket',
    s3keyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET
};

const s3Client = new S3({ params });

const s3Actions = {
    getURL: async (propId) => {
        const s3bucketUrl = await s3Client.getSignedUrl("putObject", {
            Bucket: params.BucketName,
            Key: propId,
            Expires: 60 
        });
        return s3bucketUrl
    }
};

module.exports = s3Actions;
