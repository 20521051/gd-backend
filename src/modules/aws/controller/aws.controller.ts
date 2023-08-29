import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from '../service';
import { ApiTags } from '@nestjs/swagger';

@Controller('Aws')
@ApiTags('aws')
export class AwsController {
  constructor(private awsService: AwsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    await this.awsService.upload({
      fileName: file.originalname,
      file: file.buffer,
      fileKey: 'asdf',
      contentType: 'dsafasd',
    });
  }

  @Delete('/:key')
  async delete(@Param('key') fileKey: string) {
    return this.awsService.delete(fileKey);
  }

  @Get()
  async get(@Body() fileKey: string) {
    return this.awsService.get(fileKey);
  }

  @Get('/files')
  async getAll() {
    return this.awsService.getAll();
  }
}
