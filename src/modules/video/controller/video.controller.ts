import { Controller, Body, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VideoService } from '../service';
import { UpdateVideoDTO, VideoDTO } from '../dto';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() dto: VideoDTO) {
    return this.videoService.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateVideoDTO) {
    return this.videoService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.videoService.delete(id);
  }
}
