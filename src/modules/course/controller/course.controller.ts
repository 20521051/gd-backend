import { Controller, Body, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '../service';
import { UpdateCourseDTO, CourseDTO } from '../dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() dto: CourseDTO) {
    return this.courseService.create(dto);
  }

  @Put('/:courseId')
  update(@Param('courseId') courseId: string, @Body() dto: UpdateCourseDTO) {
    return this.courseService.update(courseId, dto);
  }

  @Delete('/:courseId')
  delete(@Param('courseId') courseId: string) {
    return this.courseService.delete(courseId);
  }
}
