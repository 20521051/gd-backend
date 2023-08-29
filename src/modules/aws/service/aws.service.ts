import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });
  private readonly bucketName = this.configService.get('AWS_BUCKET_NAME');

  constructor(private readonly configService: ConfigService) {}

  async get(fileKey: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });
      const url = await getSignedUrl(this.s3Client, command);
      console.log(url);
      return url;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
      });

      return await this.s3Client.send(command);
    } catch (error) {
      console.log(error);
    }
  }
  async upload(data: { fileName: string; file: Buffer; fileKey: string; contentType: string }) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: data.fileKey,
        ContentType: data.contentType,
      });
      const url = await getSignedUrl(this.s3Client, command);

      return url;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(fileKey: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      return await this.s3Client.send(command);
    } catch (error) {
      console.log(error);
    }
  }
}
