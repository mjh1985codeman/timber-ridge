const {S3Client, PuObjectCommand} = require("@aws-sdk/client-s3");

const region = 'us-east-1';
const bucketName = 'tr-prop-bucket';
const s3keyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET;

const client = new S3Client({});

const main = async (propId, propPicObj) => {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: propId,
        Body: propPicObj,
    });

    try {
        const response = await client.send(command);
            console.log('response' , response);
        } catch (error) {
        console.log(error);
        }
};

module.exports = main;
