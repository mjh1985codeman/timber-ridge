const {S3Client, PutObjectCommand, CreateBucketCommand} = require("@aws-sdk/client-s3");

const params = {
    Region: 'us-east-1',
    BucketName: 'tr-prop-bucket',
    s3keyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET
};

const s3Client = new S3Client({ region: params.Region });
console.log('s3Client: ', s3Client);

const getS3BucketURL = {
    getURL: (key) => {
        const s3bucketUrl = `A handy url plus the ${key}`;
        return s3bucketUrl
    }
};

// const main = async (propId, propPicObj) => {
//     const command = new PutObjectCommand({
//         Bucket: params.BucketName,
//         Key: propId,
//         Body: propPicObj,
//     });

//     try {
//         const response = await client.send(command);
//             console.log('response' , response);
//         } catch (error) {
//         console.log(error);
//         }
// };

module.exports = getS3BucketURL;
