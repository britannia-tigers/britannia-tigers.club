import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword, IsArray, ArrayMinSize, IsObject, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'
import { UserCreateUpdateRequest } from "./user.interface";


export class UserDto implements Omit<UserCreateUpdateRequest, 'username'> {


  @IsString()
  @ApiProperty()
  readonly name:string;

  @IsEmail()
  @ApiProperty()
  readonly email:string;

  @IsPhoneNumber()
  @ApiProperty()
  readonly phone_number: string;

  @IsStrongPassword()
  @ApiProperty()
  readonly password: string;

}

export class UpdateUserMetaDataDto {

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  readonly images?: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  readonly videos?: string[];

}

export class UpdateUserStatsDto {
  @IsArray()
  @ApiProperty()
  readonly position?: string[]

  @IsNumber()
  @ApiProperty()
  readonly weight?: string

  @IsNumber()
  @ApiProperty()
  readonly height?: string

  @IsNumber()
  @ApiProperty()
  readonly strength?: number

  @IsNumber()
  @ApiProperty()
  readonly stamina?: number

  @IsNumber()
  @ApiProperty()
  readonly grit?: number

  @IsNumber()
  @ApiProperty()
  readonly strategy?: number

  @IsNumber()
  @ApiProperty()
  readonly agility?: number


}
