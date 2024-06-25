import { Body, Controller, Get, Header, Headers, NotFoundException, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
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


  /**
   * upload team avatar
   * @param authToken 
   * @param file 
   * @param userId 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    }
  })
  @Post('team/:id/avatar/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([
    MemberPermissions.WRITE
  ]))
  async uploadTeamAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') userId: string
  ) {
    const user = await this.userService.getUser(userId);

    if(!user.app_metadata?.type.includes('team')) {
      throw new NotFoundException(`User with id ${userId} is not part of the team.`)
    }

    const tmp = await this.cloudinaryService.upload(file);
    const res = await this.userService.updateUser(userId, {
      app_metadata: {
        ...user.app_metadata,
        teamAvatar: tmp.public_id
      }
    });

    return res.data;    
  }


}