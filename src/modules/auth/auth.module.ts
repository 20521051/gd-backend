import { UserService } from '~/user/service';
import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, UserService, AtStrategy, RtStrategy],
  exports: [UserService],
})
export class AuthModule {}
