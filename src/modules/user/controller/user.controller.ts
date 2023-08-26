import { AccessTokenGuard } from '~/auth/guard';
import { UserService } from '~/user/service';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateUserDTO } from '~/user/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // for test
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get('/:id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access_token')
  async get(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access_token')
  @Put('/:id')
  async update(@Body() dto: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.update(dto, id);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access_token')
  @Put('/:id/password')
  async changePassword(@Body() dto: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.update(dto, id);
  }
}
