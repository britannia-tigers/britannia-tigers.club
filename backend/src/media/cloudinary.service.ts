import { Injectable } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary';


@Injectable()
export class CloudinaryService {

  constructor() {
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    cloudinary.config({ 
      cloud_name: 'dlpk5xuhc', 
      api_key: apiKey, 
      api_secret: apiSecret
    });
  }

  async upload(file: Express.Multer.File, name?: string) {
    // cloudinary.uploader.upload()
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const cldRes = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto'
    });

    return cldRes;
  }

  avatarCrop(publicId:string, fileFormat: string) {
    return cloudinary.url(`${publicId}.${fileFormat}`, {
      gravity: "face", 
      height: 360, 
      width: 360, 
      crop: "thumb"});
  }

  imageResize(publicId:string, fileFormat: string) {
    return cloudinary.url(`${publicId}.${fileFormat}`, {
      height: 900, 
      width: 1600, 
      crop: "fill"});
  }

          
}
