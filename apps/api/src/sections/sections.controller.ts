import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { SectionsService } from "./sections.service";
import { AccessTokenGuard } from "src/auth/guards/access-token.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Request } from "express";
import { CreateLectureDto } from "src/lectures/dto/create-lecture.dto";
import { Lecture as LectureEntity } from "src/_gen/prisma-class/lecture";
import { Section as SectionEntity } from "src/_gen/prisma-class/section";
import { UpdateSectionDto } from "./dto/update-section.dto";

type RequestWithUser = Request & { user: Express.User };

@ApiTags("sections")
@Controller("sections")
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get(":sectionId")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "섹션 상세 정보" })
  @ApiParam({ name: "sectionId", description: "섹션 ID" })
  @ApiOkResponse({
    description: "섹션 상세 정보",
    type: SectionEntity,
  })
  findOne(@Param("sectionId") sectionId: string, @Req() req: RequestWithUser) {
    return this.sectionsService.findOne(sectionId, req.user.sub);
  }

  @Post(":sectionId/lectures")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "새 강의 생성" })
  @ApiParam({ name: "sectionId", description: "섹션 ID" })
  @ApiBody({ type: CreateLectureDto })
  @ApiOkResponse({
    description: "강의 생성",
    type: LectureEntity,
  })
  createLecture(
    @Param("sectionId") sectionId: string,
    @Body() createLectureDto: CreateLectureDto,
    @Req() req: RequestWithUser,
  ) {
    return this.sectionsService.createLecture(sectionId, createLectureDto, req.user.sub);
  }

  @Patch(":sectionId")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "섹션 업데이트" })
  @ApiParam({ name: "sectionId", description: "섹션 ID" })
  @ApiBody({ type: UpdateSectionDto })
  @ApiOkResponse({
    description: "섹션 업데이트",
    type: SectionEntity,
  })
  update(
    @Param("sectionId") sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
    @Req() req: RequestWithUser,
  ) {
    return this.sectionsService.update(sectionId, updateSectionDto, req.user.sub);
  }

  @Delete(":sectionId")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "섹션 삭제" })
  @ApiParam({ name: "sectionId", description: "섹션 ID" })
  @ApiBody({ type: UpdateSectionDto })
  @ApiOkResponse({
    description: "섹션 삭제 성공",
    type: SectionEntity,
  })
  delete(@Param("sectionId") sectionId: string, @Req() req: RequestWithUser) {
    return this.sectionsService.delete(sectionId, req.user.sub);
  }
}
