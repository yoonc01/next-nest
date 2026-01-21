import { ApiProperty } from "@nestjs/swagger";

export class UserTestResponseDto {
  @ApiProperty({
    description: "로그인 사용자 이메일 정보",
    example: "user email : test@example.com",
  })
  message!: string;
}
