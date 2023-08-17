import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from './services';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
