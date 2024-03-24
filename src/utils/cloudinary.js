import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    
    api_key: process.env.CLOUDINARY_API_KEY,
    
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath){
            console.log("Couldn't find the file  path!")
        } else {
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            })
            //file uploaded successfully
            console.log("file is uploaded successfully on cloudinary", response, response.url)
            return response;
        }

    } catch(error) {
        fs.unlinkSync(localFilePath)
        //removing the locally saved temorary file from the local server as the operation got failed
        return null;
    }
}

export default uploadOnCloudinary;