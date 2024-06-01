import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";



export class PaymentCreateDto {

  @IsString()
  @ApiProperty({ required: true })
  readonly priceId:string;

  @IsNumber()
  @ApiProperty({ required: false })
  readonly quantity:number;

  @IsString()
  @ApiProperty({ required: true })
  readonly userId:string;

}

export class PaymentGetDto {
  @IsString()
  @ApiProperty({ required: false })
  readonly date: string
}