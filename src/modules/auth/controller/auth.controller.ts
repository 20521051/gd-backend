import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDTO } from '~/user';
import { AuthDTO } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '@/decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() dto: CreateUserDTO) {
    return this.authService.signUp(dto);
  }

  @Post('/sign-in/user-name')
  signInWithUserName(@Body() dto: AuthDTO) {
    return this.authService.signInWithUserName(dto);
  }

  @Post('/sign-in/email')
  signInWithEmail(@Body() dto: AuthDTO) {
    return this.authService.signInWithEmail(dto);
  }

  @Post('/sign-in/phone')
  signInWithPhone(@Body() dto: AuthDTO) {
    return this.authService.signInWithPhone(dto);
  }

  @Post('/logout')
  logOut(@GetCurrentUserId() userId: string) {
    return this.authService.logOut(userId);
  }
}
