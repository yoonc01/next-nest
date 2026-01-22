import { Module } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { SectionsModule } from "src/sections/sections.module";

@Module({
  imports: [PrismaModule, SectionsModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
