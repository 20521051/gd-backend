import { Global, Module } from '@nestjs/common';
import { IPFSService } from './service';

@Global()
@Module({
  providers: [IPFSService],
  exports: [IPFSService],
})
export class IPFSModule {}
