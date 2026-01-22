import { Module } from '@nestjs/common';
import { LecturesModule } from 'src/lectures/lectures.module';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';

@Module({
  imports: [LecturesModule],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
