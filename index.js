const {S3Client,GetObjectCommand, PutObjectCommand,ListObjectsV2Command, DeleteObjectCommand} =  require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const s3client = new S3Client({
    region: "ap-south-1",
    credentials: {
        // accessKeyId:"",
        // secretAccessKey:""

    }
})


async function getObjectUrl(key){
    const command = new GetObjectCommand({
        Bucket: "sanket-private",
        Key: key
    })
    const url  =await getSignedUrl(s3client, command)
    return url;
}


async function init() {
    console.log("url from s3", await getObjectUrl("buterfly.png"))
    
}

async function putObject(filename,constentype ) {
    const command =  new PutObjectCommand({
    Bucket: "sanket-private",
    Key: `/${filename}`,
    ContentType: constentype
    })

    const url = await getSignedUrl(s3client, command)
    return url;
} 

async function listObjects() {
    const command = new ListObjectsV2Command({
        Bucket: "sanket-private",
        Key: '/',
    })

    const res = await s3client.send(command)
    console.log(res)
}

async function deleteObject(key) {
    const command = new DeleteObjectCommand({
        Bucket: "sanket-private",
        Key: key
    })

    await s3client.send(command)
}

async function init() {
    // console.log("url from s3", await getObjectUrl("/dinesh.jpg"))
    // console.log("uploading to s3", await putObject("dinesh.jpg","image/jpg"))
    // await listObjects()
    await deleteObject("/dinesh.jpg")
}

init()