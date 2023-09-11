import { Module } from '@nestjs/common';
import { AwsService } from './service';
import { AwsController } from './controller';

@Module({
  imports: [],
  controllers: [AwsController],
  providers: [AwsService],
})
export class AwsModule {}
