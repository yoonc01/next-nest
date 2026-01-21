import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AccessTokenGuard } from "./auth/guards/access-token.guard";
import { Request } from "express";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { UserTestResponseDto } from "./app/dto/user-test-response.dto";

type RequestWithUser = Request & { user: Express.User };

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/user-test")
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: UserTestResponseDto })
  testUser(@Req() req: RequestWithUser): UserTestResponseDto {
    return { message: `user email : ${req.user.email}` };
  }
}
