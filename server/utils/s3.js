const {PutObjectCommand, S3Client} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const BUCKET = 'tr-prop-bucket';

const s3Actions = {
    getURL: (propId) => {
        const fileName = `${propId}.json`;
        const command = new PutObjectCommand({ Bucket: BUCKET, Key: fileName, ContentType: 'application/json' });
        return getSignedUrl(s3Client, command);
    },

    getCoverPicURL: (propId) => {
        const fileName = `cover-${propId}.json`;
        const command = new PutObjectCommand({ Bucket: BUCKET, Key: fileName, ContentType: 'application/json' });
        return getSignedUrl(s3Client, command);
    } 
};

module.exports = s3Actions;