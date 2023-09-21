import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './provider';
import { CloudinaryService } from './service';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
