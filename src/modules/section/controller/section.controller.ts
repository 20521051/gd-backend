import { Controller, Body, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SectionService } from '../service';
import { UpdateSectionDTO, SectionDTO, UpdateVideoSectionDTO } from '../dto';

@ApiTags('Section')
@Controller('section')
export class SectionController {
  constructor(private readonly indexService: SectionService) {}

  @Post()
  create(@Body() dto: SectionDTO) {
    return this.indexService.create(dto);
  }

  @Put('/:indexId')
  update(@Param('indexId') indexId: string, @Body() dto: UpdateSectionDTO) {
    return this.indexService.update(indexId, dto);
  }

  @Delete('/:indexId')
  delete(@Param('indexId') indexId: string) {
    return this.indexService.delete(indexId);
  }

  @Put('/:indexId/insert')
  insertVideo(@Param('indexId') indexId: string, @Body() dto: UpdateVideoSectionDTO) {
    return this.indexService.insertVideo(indexId, dto);
  }

  @Put('/:indexId/remove')
  removeVideo(@Param('indexId') indexId: string, @Body() dto: UpdateVideoSectionDTO) {
    return this.indexService.removeVideo(indexId, dto);
  }
}
