import { Controller, Body, Post, Put, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../service';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dto';
import { imageFileFilter } from '@/utils';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCategoryDTO })
  create(@Body() dto: CreateCategoryDTO, @UploadedFile() image: Express.Multer.File) {
    return this.categoryService.create({ name: dto.name, thumbnail: image });
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCategoryDTO })
  update(@Body() dto: UpdateCategoryDTO, @UploadedFile() image?: Express.Multer.File) {
    return this.categoryService.update({ name: dto.name, newName: dto.newName, thumbnail: image });
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
