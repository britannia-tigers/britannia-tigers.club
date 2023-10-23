import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { PaginationQueryOptions } from "contentful-management";



export class SessionDto {

  @IsString()
  @ApiProperty({ required: false })
  readonly name:string;

  @IsString()
  @ApiProperty({ required: false })
  readonly location:string;

  @IsString()
  @ApiProperty({ required: false })
  readonly date:string;

  @IsString()
  @ApiProperty({ required: false })
  readonly startDate:string;

  @IsString()
  @ApiProperty({ required: false })
  readonly endDate:string;

  @IsArray()
  @ApiProperty({ required: false })
  readonly participants: string[];

}


export class SessionRequestDto extends SessionDto implements PaginationQueryOptions {

  @IsNumber()
  @ApiProperty({ required: false })
  readonly limit:number;

  @IsNumber()
  @ApiProperty({ required: false })
  readonly skip:number;
}

export class AddParticipantsDto {
  @IsString()
  @ApiProperty({ required: true })
  readonly userIds: string[]
}