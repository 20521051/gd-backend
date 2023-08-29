import { Module } from '@nestjs/common';
import { AwsService } from './service';
import { AwsController } from './controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AwsController],
  providers: [AwsService],
})
export class AwsModule {}
