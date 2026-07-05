import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";

const imageKit =  new ImageKit({
    privateKey : config.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile (buffer) {
    const result = await imageKit.files.upload({
        file : buffer.toString('base64') ,
        fileName : 'image.jpg'
    }) ;
    return result ;
};

export default uploadFile ;