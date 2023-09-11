import { Controller, Body, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExerciseService } from '../service';
import { UpdateExerciseDTO, ExerciseDTO } from '../dto';

@ApiTags('Exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  create(@Body() dto: ExerciseDTO) {
    return this.exerciseService.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateExerciseDTO) {
    return this.exerciseService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.exerciseService.delete(id);
  }
}
