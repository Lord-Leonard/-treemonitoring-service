import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString
} from 'class-validator';

export class LoginUserDto {
  @ApiHideProperty()
  id: number

  @ApiHideProperty()
  admin: boolean
// 
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}
