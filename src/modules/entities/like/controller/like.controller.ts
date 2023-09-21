import { Controller, Body, Post, Put, Delete, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LikeService } from '../service';
import { LikeDTO } from '../dto';

@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.likeService.get(id);
  }

  @Post()
  create(@Body() dto: LikeDTO) {
    return this.likeService.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() isLike: boolean) {
    return this.likeService.update(id, isLike);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.likeService.delete(id);
  }
}
