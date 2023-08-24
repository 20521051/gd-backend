import { AccessTokenGuard } from '~/auth/guard';
import { UserService } from '~/user/service';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateUserDTO } from '~/user/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async get(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Put('/:id')
  async update(@Body() data: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.update(data, id);
  }

  @Put('/:id')
  async changePassword(@Body() data: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.update(data, id);
  }
}
