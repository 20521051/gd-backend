import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service';
import { CreateUserDTO } from '~/user';
import { AuthDTO } from '../dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, GetCurrentUserId } from '@/decorators';
import { RefreshTokenGuard } from '../guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() dto: CreateUserDTO) {
    return this.authService.signUp(dto);
  }

  @Post('/sign-in')
  signIn(@Body() dto: AuthDTO) {
    return this.authService.signIn(dto);
  }

  @Post('/log-out')
  logOut(@GetCurrentUserId() userId: string) {
    return this.authService.logOut(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth('refresh_token')
  @Post('/refresh-token')
  refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
