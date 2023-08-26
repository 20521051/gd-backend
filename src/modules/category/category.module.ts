import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { CategoryService } from './service';
import { CategoryController } from './controller';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
