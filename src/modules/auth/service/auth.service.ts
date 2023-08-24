import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '@/types';
import { AuthDTO } from '../dto';
import { ResponseFailure, ResponseSuccess, SHA256 } from '@/utils';
import { UserService } from '~/user/service';
import { CreateUserDTO } from '~/user/dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async generateTokens(userId: string, userName: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      userName: userName,
    };

    console.log(this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'));
    console.log(this.config.get<string>('ACCESS_TOKEN_SECRET_KEY'));

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: '5m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hash = SHA256.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (!user.refreshToken || !(user.refreshToken === SHA256.hash(refreshToken))) {
        return ResponseFailure({
          error: 'ERROR_ACCESS_DENIED',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      const tokens = await this.generateTokens(user.id, user.userName);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return ResponseSuccess({
        data: tokens,
        message: 'REFRESH_TOKEN_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_REFRESH_TOKEN',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async signUp(data: CreateUserDTO) {
    try {
      const user = await this.userService.create(data);
      // if (!user) {
      //   return ResponseFailure({
      //     error: 'ERROR_SIGN_UP',
      //     statusCode: HttpStatus.BAD_REQUEST,
      //   });
      // }
      return ResponseSuccess({
        data: data,
        message: 'SIGN_UP_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_SIGN_UP',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  // async signIn(dto: AuthDTO, rememberMe = false) {
  async signIn(dto: AuthDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          userName: dto.userName,
        },
      });
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (!SHA256.verify(dto.password, user.password)) {
        return ResponseFailure({
          error: 'ERROR_PASSWORD_USER_INCORRECT',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      //jhdfjkasjkfd
      const tokens = await this.generateTokens(user.id, user.userName);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return ResponseSuccess({
        data: tokens,
        message: 'SIGN_IN_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_SIGN_IN',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async logOut(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (!user.refreshToken) {
        return ResponseFailure({
          error: 'ERROR_ACCESS_DENIED',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      await this.prisma.user.updateMany({
        where: {
          id: userId,
        },
        data: {
          refreshToken: null,
        },
      });
      return ResponseSuccess({
        data: true,
        message: 'LOGOUT_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_LOGOUT',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
