import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { CategoryService } from './service';
import { CategoryController } from './controller';
import { CloudinaryModule, CloudinaryService } from '@/modules/uploader';

@Module({
  imports: [CloudinaryModule],
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService, CloudinaryService],
  exports: [CategoryService],
})
export class CategoryModule {}
