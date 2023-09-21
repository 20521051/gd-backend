import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { CourseService } from './service';
import { CourseController } from './controller';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [PrismaService, CourseService],
  exports: [CourseService],
})
export class CourseModule {}
