import { Controller, Body, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../service';
import { CategoryDTO, UpdateCategoryDTO } from '../dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() dto: CategoryDTO) {
    return this.categoryService.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateCategoryDTO) {
    return this.categoryService.update(dto);
  }

  @Delete('/:name')
  delete(@Param('name') name: string) {
    return this.categoryService.delete(name);
  }
}
