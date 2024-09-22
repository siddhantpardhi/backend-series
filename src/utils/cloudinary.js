import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" 
    }) 
        // console.log(response);
        
        // file has been uploaded successfully
        // console.log("file has been uploaded on cloudinary", response.url)
        try{
            fs.unlinkSync(localFilePath)
        }
        catch(err) {
            console.log(err);
            
        }
        
        return response;
   } catch(error) {
      fs.unlinkSync(localFilePath) // removes the locally saved temporary file since
      // the upload operation got failed
      return null;j
    } 
}

export  { uploadOnCloudinary }