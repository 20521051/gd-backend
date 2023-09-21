import { Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import toStream from 'buffer-to-stream';

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private cloudinary) {}
  async upload(file: Express.Multer.File, folderName: string, fileOlderId?: string): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        {
          folder: 'images/' + folderName,
        },
        (error, result) => {
          if (error) return reject(error);
          if (fileOlderId) {
            this.cloudinary.uploader.destroy(fileOlderId);
          }
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }

  async get(publicId: string): Promise<string> {
    if (publicId) {
      const url = this.cloudinary.url(publicId);
      return url;
    }

    return 'https://res.cloudinary.com/graduatationdissertation/image/upload/v1695134159/default_c7gzv4.jpg';
  }

  delete(pulbicId: string): boolean {
    try {
      this.cloudinary.uploader.destroy(pulbicId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
