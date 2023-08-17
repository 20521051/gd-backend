import { UserService } from '../services';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateUserDTO, CreateUserDTO } from '../dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async get(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
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
