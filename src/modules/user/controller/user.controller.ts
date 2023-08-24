import { AccessTokenGuard } from '~/auth/guard';
import { UserService } from '~/user/service';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateUserDTO } from '~/user/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getAll();
  }
  @Get('/:id')
  async get(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Put('/:id')
  async update(@Body() data: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.update(data, id);
  }

  @Put('/:id/password')
  async changePassword(@Body() data: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.update(data, id);
  }
}
