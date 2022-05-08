import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class S3UploadService {
  constructor(private readonly configService: ConfigService) { }
  //
  async create(imageBuffer: Buffer, filename: string, folder_path: string) {
    const random = Math.ceil(Math.random() * 9999);

    const s3 = new S3();
    try {
      const regex = /(?:\.([^.]+))?$/;

      const ext = regex.exec(filename)[1];

      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME') + folder_path,
          Body: imageBuffer,
          Key: `${random}.${ext}`,
        })
        .promise();
      const result = {
        key: uploadResult.Key, //file name with folder
        location: uploadResult.Location, //full path
      };
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async createGeneral(imageBuffer: Buffer, filename: string, folder_path: string) {
    const random = Math.ceil(Math.random() * 9999);

    const s3 = new S3();
    try {
      const regex = /(?:\.([^.]+))?$/;

      const ext = regex.exec(filename)[1];

      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME') + folder_path,
          Body: imageBuffer,
          Key: `${random}.${ext}`,
        })
        .promise();
      const result = {
        key: uploadResult.Key, //file name with folder
        location: uploadResult.Location, //full path
      };
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async delete(filename: string) {
    try {
      const s3 = new S3();
      let result = await s3
        .deleteObject({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Key: filename,
        })
        .promise();
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
  async createMultiple() {
    try {
      const s3 = new S3();

      // const uploadFiles = await s3.listMultipartUploads
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
