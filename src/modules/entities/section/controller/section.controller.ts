import { Controller, Body, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SectionService } from '../service';
import { UpdateSectionDTO, SectionDTO, UpdateVideoSectionDTO } from '../dto';

@ApiTags('Section')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() dto: SectionDTO) {
    return this.sectionService.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateSectionDTO) {
    return this.sectionService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.sectionService.delete(id);
  }

  @Put('/:id/insert')
  insertVideo(@Param('id') id: string, @Body() dto: UpdateVideoSectionDTO) {
    return this.sectionService.insertVideo(id, dto);
  }

  @Put('/:id/remove')
  removeVideo(@Param('id') id: string, @Body() dto: UpdateVideoSectionDTO) {
    return this.sectionService.removeVideo(id, dto);
  }
}
