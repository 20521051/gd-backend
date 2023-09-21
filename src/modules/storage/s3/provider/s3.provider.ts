import { S3Client } from '@aws-sdk/client-s3';

export const S3Provider = {
  provide: 'S3',
  useFactory: () => {
    return new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  },
};
