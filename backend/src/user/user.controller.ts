import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {

  constructor(private readonly userService: UserService) {}


  @Get()
  getUsers():Promise<any> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id) {
    return this.userService.getUsers(id);
  }

}
