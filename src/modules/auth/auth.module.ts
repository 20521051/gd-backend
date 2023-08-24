import { UserModule } from '~/user';
import { UserService } from '~/user/service';
import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({
      // global: true,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, UserService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
