import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
