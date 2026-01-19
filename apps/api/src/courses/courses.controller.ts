import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/auth/guards/access-token.guard";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Request } from "express";
import { Prisma } from "@prisma/client";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course as CourseEntity } from "src/_gen/prisma-class/course";

type RequestWithUser = Request & { user: Express.User };

@ApiTags("course")
@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  create(@Req() req: RequestWithUser, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(req.user.sub, createCourseDto);
  }

  @Get()
  @ApiQuery({ name: "title", required: false })
  @ApiQuery({ name: "level", required: false })
  @ApiQuery({ name: "categoryId", required: false })
  @ApiQuery({ name: "skip", required: false })
  @ApiQuery({ name: "take", required: false })
  findAll(
    @Query("title") title?: string,
    @Query("level") level?: string,
    @Query("categoryId") categoryId?: string,
    @Query("skip") skip?: string,
    @Query("take") take?: string,
  ) {
    const where: Prisma.CourseWhereInput = {};

    if (title) {
      where.title = { contains: title, mode: "insensitive" };
    }

    if (level) {
      where.level = level;
    }

    if (categoryId) {
      where.category = {
        some: {
          id: categoryId,
        },
      };
    }

    return this.coursesService.findAll({
      where,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      orderBy: {
        createAt: "desc",
      },
    });
  }

  @Get(":id")
  @ApiQuery({
    name: "include",
    required: false,
    description: "sections, lectures, courseReviews 등 포함할 관계 지정",
  })
  @ApiOkResponse({ description: " 코스 상세 정보", type: CourseEntity })
  findOne(@Param("id", ParseUUIDPipe) id: string, @Query("include") include?: string) {
    const includeArray = include ? include.split(",") : undefined;

    return this.coursesService.findOne(id, includeArray);
  }

  @Patch(":id")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Req() req: RequestWithUser,
    @Body() UpdateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, req.user.sub, UpdateCourseDto);
  }

  @Delete(":id")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  delete(@Param("id", ParseUUIDPipe) id: string, @Req() req: RequestWithUser) {
    return this.coursesService.delete(id, req.user.sub);
  }
}
