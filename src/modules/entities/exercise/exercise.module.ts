import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { ExerciseService } from './service';
import { ExerciseController } from './controller';

@Module({
  imports: [],
  controllers: [ExerciseController],
  providers: [PrismaService, ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
