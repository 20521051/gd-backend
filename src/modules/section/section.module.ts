import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { SectionService } from './service';
import { SectionController } from './controller';

@Module({
  imports: [],
  controllers: [SectionController],
  providers: [PrismaService, SectionService],
  exports: [SectionService],
})
export class SectionModule {}
