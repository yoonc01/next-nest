import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { LecturesService } from "./lectures.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AccessTokenGuard } from "src/auth/guards/access-token.guard";
import { Lecture as LectureEntity } from "src/_gen/prisma-class/lecture";
import { UpdateLectureDto } from "./dto/update-lecture.dto";

type RequestWithUser = Request & { user: Express.User };

@ApiTags("lectures")
@Controller("lectures")
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Get(":lectureId")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "개별 강의 상세 정보" })
  @ApiParam({ name: "lectureId", description: "개별 강의 ID" })
  @ApiOkResponse({
    description: "개별 강의 상세 정보",
    type: LectureEntity,
  })
  findOne(@Param("lectureId") lectureId: string, @Req() req: RequestWithUser) {
    return this.lecturesService.findOne(lectureId, req.user.sub);
  }

  @Patch(":lectureId")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "개별 강의 업데이트" })
  @ApiParam({ name: " lectureId", description: "개별 강의 ID" })
  @ApiBody({ type: UpdateLectureDto })
  @ApiOkResponse({
    description: "개별 강의 업데이트",
    type: LectureEntity,
  })
  update(
    @Param("lectureId") lectureId: string,
    @Body() updateLectureDto: UpdateLectureDto,
    @Req() req: RequestWithUser,
  ) {
    return this.lecturesService.update(lectureId, updateLectureDto, req.user.sub);
  }

  @Delete(":lectureId")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "개별 강의 삭제" })
  @ApiParam({ name: " lectureId", description: "개별 강의 ID" })
  @ApiBody({ type: UpdateLectureDto })
  @ApiOkResponse({
    description: "개별 강의 삭제 성공",
    type: LectureEntity,
  })
  delete(@Param("lectureId") lectureId: string, @Req() req: RequestWithUser) {
    return this.lecturesService.delete(lectureId, req.user.sub);
  }
}
