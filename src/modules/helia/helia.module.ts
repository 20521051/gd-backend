import { Global, Module } from '@nestjs/common';
import { HeliaService } from './service';

@Global()
@Module({
  providers: [HeliaService],
  exports: [HeliaService],
})
export class HeliaModule {}
