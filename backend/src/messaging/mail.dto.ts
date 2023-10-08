import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class EnquiryDto {

  @IsString()
  @ApiProperty({ required: true })
  readonly name: string;

  @IsString()
  @ApiProperty({ required: true })
  readonly email: string;

  @IsString()
  @ApiProperty({ required: false })
  readonly phone: string;

  @IsString()
  @ApiProperty({ required: true })
  readonly message: string;

}