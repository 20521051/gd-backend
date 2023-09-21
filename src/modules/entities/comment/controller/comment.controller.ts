import { Controller, Body, Post, Put, Delete, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from '../service';
import { UpdateCommentDTO, CommentDTO } from '../dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() dto: CommentDTO) {
    return this.commentService.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDTO) {
    return this.commentService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }

  @Put('/:id/deleted')
  setIsDeleted(@Param('id') id: string) {
    return this.commentService.setIsDeleted(id);
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.commentService.get(id);
  }
}
