import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { PaginationQueryOptions } from "contentful-management";



export class SessionDto {
  @IsString()
  @ApiProperty({ required: true })
  readonly name:string;

  @IsString()
  @ApiProperty({ required: true })
  readonly location:string;

  @IsString()
  @ApiProperty({ required: true })
  readonly date:string;

}


export class SessionRequestDto extends SessionDto implements PaginationQueryOptions {

  @IsNumber()
  @ApiProperty({ required: false })
  readonly limit:number;

  @IsNumber()
  @ApiProperty({ required: false })
  readonly skip:number;
}