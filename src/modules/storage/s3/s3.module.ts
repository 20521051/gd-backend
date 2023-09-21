import { Module } from '@nestjs/common';
import { S3Service } from './service';
import { S3Provider } from './provider';

@Module({
  imports: [],
  controllers: [],
  providers: [S3Service, S3Provider],
  exports: [S3Service, S3Provider],
})
export class S3Module {}
