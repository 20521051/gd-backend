import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '@/types';
import { AuthDTO } from '../dto';
import { ResponseFailure, ResponseSuccess, BCRYPT } from '@/utils';
import { UserService } from '~/user/service';
import { CreateUserDTO } from '~/user/dto';
/* 
  key futures: Auth service
  + get token
  + update refresh token
  + refresh token
  + sign up
  + sign in
  + log out
*/
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async generateTokens(payload: {
    id: string;
    userName?: string;
    email?: string;
    phone?: string;
    wallet?: string;
  }): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: payload.id,
      userName: payload.userName || 'none',
      email: payload.email || 'none',
      phone: payload.phone || 'none',
      wallet: payload.wallet || 'none',
    };

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
    const hash = BCRYPT.hash(refreshToken);
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
      if (!user.refreshToken || !BCRYPT.verify({ input: user.refreshToken, hash: refreshToken })) {
        return ResponseFailure({
          error: 'ERROR_ACCESS_DENIED',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      const tokens = await this.generateTokens({
        id: user.id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        wallet: user.wallet,
      });
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
      await this.userService.create(data);
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

  async signIn(dto: AuthDTO) {
    try {
      const user = await this.prisma.user.findMany({
        where: {
          OR: [{ userName: dto.userName }, { email: dto.email }, { phone: dto.phone }, { wallet: dto.wallet }],
        },
      });
      const index = (dto.email && 1) || (dto.phone && 2) || (dto.wallet && 3) || 0;
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (!BCRYPT.verify({ input: dto.password, hash: user[index].password })) {
        return ResponseFailure({
          error: 'ERROR_PASSWORD_USER_INCORRECT',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      // đã có nơi đăng nhập nhưng chưa logout
      if (!user[index].refreshToken) {
        return ResponseFailure({
          error: 'ERROR_ACCESS_DENIED',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      const tokens = await this.generateTokens({
        id: user[index].id,
        userName: user[index].userName,
        email: user[index].email,
        phone: user[index].phone,
        wallet: user[index].wallet,
      });
      await this.updateRefreshToken(user[index].id, tokens.refreshToken);

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
      // đã logout rồi nên bị lỗi
      if (!user.refreshToken) {
        return ResponseFailure({
          error: 'ERROR_LOGOUT_NONE',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshToken: '',
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
