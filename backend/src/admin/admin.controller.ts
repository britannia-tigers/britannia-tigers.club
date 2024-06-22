import { Body, Controller, Get, Header, Headers, NotFoundException, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBasicAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { PermissionGuard } from "src/auth/permission.guard";
import { CloudinaryService } from "src/media/cloudinary.service";
import { UserDto } from "src/user/user.dto";
import { UserTypeEnum } from "src/user/user.interface";
import { MemberPermissions } from "src/user/user.permissions";
import { UserService } from "src/user/user.service";




@ApiTags('Admins')
@Controller('api/admin')
export class AdminController {

  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  /**
   * List team members
   * @returns 
   */
  @ApiBasicAuth('bearer')
  @Get('team')
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([
    MemberPermissions.LIST
  ]))
  async getTeamUsers() {
    try {
      const users = await this.userService.getUserList();
      const filtered = users.data.filter(
        u => u.app_metadata.type.find(t => t === UserTypeEnum.team) !== -1
      );

    
      if (!filtered.length) throw new NotFoundException('No team users found');
      else return filtered;

    } catch(e) {
      throw e
    }
  }

  /**
   * Update a user
   */
  @ApiBasicAuth('bearer')
  @Put('user/:id')
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([
    MemberPermissions.WRITE
  ]))
  editUser(
    @Param('id') userId: string,
    @Body() body: UserDto
  ) {
    return this.userService.updateUser(userId, body)
  }


}