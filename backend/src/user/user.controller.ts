import { Body, Controller, Get, Headers, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateUpdateRequest, AppMetaData, User } from './user.interface';
import { PermissionGuard } from 'src/auth/permission.guard';
import { MemberPermissions, SelfPermissions } from './user.permissions';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserDto } from './user.dto';


@Controller('api/users')
export class UserController {

  constructor(private readonly userService: UserService) {}


  /**
   * get self details
   * @param authToken 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Get('self')
  @UseGuards(PermissionGuard([SelfPermissions.READ]))
  @UseGuards(AuthGuard)
  getSelf(@Headers('authorization') authToken) {
    console.log(authToken.split(' ')[1])
    return this.userService.getSelf(authToken.split(' ')[1]);
  }


  /**
   * update self details
   * @param authToken 
   * @param data 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Put('self')
  @UseGuards(PermissionGuard([SelfPermissions.WRITE]))
  @UseGuards(AuthGuard)
  async updateSelf(@Headers('authorization') authToken, @Body() data:UserDto) {
    console.log(authToken.split(' ')[1])
    const selfInfo = await this.userService.getSelf(authToken.split(' ')[1]);
    return this.userService.updateUser(selfInfo.sub, data);
  }


  /**
   * get user list
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Get()
  @UseGuards(PermissionGuard([MemberPermissions.LIST]))
  @UseGuards(AuthGuard)
  getUsers():Promise<any> {
    return this.userService.getUserList();
  }


  /**
   * get user details
   * @param id 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Get(':id')
  @UseGuards(PermissionGuard([MemberPermissions.READ]))
  @UseGuards(AuthGuard)
  getUser(@Param('id') id) {
    return this.userService.getUser(id);
  }


  /**
   * get user role
   * @param id 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Get(':id/roles')
  @UseGuards(PermissionGuard([MemberPermissions.READ]))
  @UseGuards(AuthGuard)
  getUserRole(@Param('id') id) {
    return this.userService.getUserRole(id);
  }


  /**
   * create user
   * @param body 
   * @returns 
   */
  @Post()
  createUser(@Body() body:UserDto) {
    const { email, name, password, phone_number } = body;
    const appMetaData:AppMetaData = {
      paid: false,
      team: false
    };

    return this.userService.createUser({
      email, name, phone_number, password,
      app_metadata: appMetaData,
      connection: 'Username-Password-Authentication'
    });
  }


  /**
   * update user details
   * @param id 
   * @param data 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Put(':id')
  @UseGuards(PermissionGuard([MemberPermissions.WRITE]))
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id, @Body() data:UserCreateUpdateRequest) {
    // filter out potential data injection
    const { app_metadata, ...restUser } = data as User;
    return this.userService.updateUser(id, restUser);
  }


  /**
   * mark user paid status
   * @param id 
   * @param paid 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Post(':id/paid')
  @UseGuards(PermissionGuard([MemberPermissions.WRITE]))
  @UseGuards(AuthGuard)
  async markUserPaidStatus(@Param('id') id, @Param('paid') paid:boolean) {
    const lastPaymentDate = (new Date()).toISOString();
    const app_metadata:Partial<AppMetaData> = {
      paid,
      lastPaymentDate
    }
    return this.userService.updateUser(id, { app_metadata });
  }


  /**
   * mark user team status
   * @param id 
   * @param team 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Post(':id/team')
  @UseGuards(PermissionGuard([MemberPermissions.WRITE]))
  @UseGuards(AuthGuard)
  async markUserTeamStatus(@Param('id') id, @Param('team') team:boolean) {
    const app_metadata:Partial<AppMetaData> = {
      team
    }
    return this.userService.updateUser(id, { app_metadata });
  }

}
