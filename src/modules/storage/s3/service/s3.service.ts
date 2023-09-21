import { GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/* 
  key futures: AWS service
  + get file
  + get all file
  + upload file into the bucket
  + delete file
*/
@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  constructor(private readonly configService: ConfigService, @Inject('S3') private s3Client) {}

  async get(fileKey: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: fileKey,
      });
      const url = await getSignedUrl(this.s3Client, command);
      return url;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async getAll() {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
      });

      return await this.s3Client.send(command);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async upload(data: { fileName: string; file: Buffer }) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: data.fileName,
        Body: data.file,
      });
      const url = await getSignedUrl(this.s3Client, command);
      console.log(url);
      return url;
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async delete(fileKey: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: fileKey,
      });

      return await this.s3Client.send(command);
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
