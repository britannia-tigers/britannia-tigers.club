import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'
import { UserCreateUpdateRequest } from "./user.interface";


export class UserDto implements UserCreateUpdateRequest {
  
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