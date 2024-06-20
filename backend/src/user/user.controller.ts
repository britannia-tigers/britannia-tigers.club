import { Body, Controller, Get, Headers, Logger, NotFoundException, Param, Patch, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UserCreateUpdateRequest, AppMetaData, User, UserMetaData } from './user.interface';
import { PermissionGuard } from 'src/auth/permission.guard';
import { MemberPermissions, SelfPermissions } from './user.permissions';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateUserMetaDataDto, UserDto } from './user.dto';
import { CloudinaryService } from 'src/media/cloudinary.service';
import { assert } from 'console';
import { outputUserPublic } from './user.helper';


@ApiTags('Users')
@Controller('api/user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}


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
    return this.userService.updateSelf(authToken.split(' ')[1], data);
  }


  /**
   * get user list with all users, up to 100
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Get()
  // @UseGuards(PermissionGuard([MemberPermissions.LIST]))
  // @UseGuards(AuthGuard)
  async getUsers() {
    const users = await this.userService.getUserList({ per_page: 100 });
    assert(users.data, 'User data cannot be empty')

    return users.data.map(res => outputUserPublic(res));
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
   * get user details
   * @param id 
   * @returns 
   */
    @ApiBearerAuth('bearer')
    @Get(':id/public')
    getUserPublic(@Param('id') id) {
      return this.userService.getUser(id)
        .then(res => ({
          ...res,
          data: outputUserPublic(res.data)
        }))
    }


  /**
   * get self role
   * @param id 
   * @returns 
   */
    @ApiBearerAuth('bearer')
    @Get('self/roles')
    @UseGuards(PermissionGuard([SelfPermissions.READ]))
    @UseGuards(AuthGuard)
    async getSelfRole(@Headers('authorization') authToken) {
      console.log(authToken.split(' ')[1])
      const res = await this.userService.getSelfRole(authToken.split(' ')[1])
      return res
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
  // @Post()
  // createUser(@Body() body:UserDto) {
  //   const { email, name, password, phone_number } = body;
  //   const appMetaData:AppMetaData = {
  //     isPaid: false,
  //     team: ["member"]
  //   };

  //   return this.userService.createUser({
  //     email, name, phone_number, password,
  //     app_metadata: appMetaData,
  //     connection: 'Username-Password-Authentication'
  //   });
  // }

  /**
   * Upload an avatar
   * @param file 
   */
  @ApiBearerAuth('bearer')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // comment: { type: 'string' },
        // outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('self/avatar/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadAvatar(
    @Headers('authorization') authToken,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const self = await this.userService.getSelf(authToken.split(' ')[1]);
      const cldRes = await this.cloudinaryService.upload(file);
      const profileUrl = this.cloudinaryService.avatarCrop(cldRes.public_id, cldRes.format);
      
      return await this.userService.updateUser(self.user_id, {
        picture: profileUrl
      });
      
    } catch(e) {
      throw e;
    }
  }

  
  /**
   * Upload images and videos
   * @param file 
   */
  @ApiBearerAuth('bearer')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // comment: { type: 'string' },
        // outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('self/assets/upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images' },
    { name: 'videos' }
  ]))
  @UseGuards(AuthGuard)
  async addImage(
    @Headers('authorization') authToken,
    @UploadedFiles() { images, videos }: { 
      images?: Express.Multer.File[],
      videos?: Express.Multer.File[]
    }
  ) {
    try {
      const self = await this.userService.getSelf(authToken.split(' ')[1]);

      const img_promises = images?.map(async f => {
        const tmp = await this.cloudinaryService.upload(f);
        return tmp.public_id;
        // this.cloudinaryService.imageResize(tmp.public_id, tmp.format);
      })

      const vid_promises = videos?.map(async f => {
        const tmp = await this.cloudinaryService.upload(f);
        console.log(tmp.public_id)
        return tmp.public_id;
        // this.cloudinaryService.imageResize(tmp.public_id, tmp.format);
      })

      const imageUrls = await Promise.all(img_promises || []);
      const vidUrls = await Promise.all(vid_promises || []);
      
      return await this.userService.updateUser(self.user_id, {
        user_metadata: {
          ...self.user_metadata,
          images: [...self.user_metadata?.images, ...imageUrls],
          vid_promises: [...self.user_metadata?.videos, ...vidUrls]
        }
      });
      
    } catch(e) {
      throw e;
    }
  }


  /**
   * GET user assets
   * @param authToken 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Get('self/assets')
  @UseGuards(AuthGuard)
  async getAssets(
    @Headers('authorization') authToken,

  ) {
    try {
      let { user_metadata } = await this.userService.getSelf(authToken.split(' ')[1]);
      return user_metadata;
    } catch(e) {
      throw(e);
    }
  }


  /**
   * Update user assets
   * @param authToken 
   * @param param1 
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Put('self/assets')
  @UseGuards(AuthGuard)
  async updateAssets(
    @Headers('authorization') authToken,
    @Body() { images, videos }: UpdateUserMetaDataDto
  ) {
    try {
      let { user_id, user_metadata } = await this.userService.getSelf(authToken.split(' ')[1]);

      if(images) {
        user_metadata.images = images;
      }

      if(videos) {
        user_metadata.videos = videos;
      }

      const successRes = await this.userService.updateUser(user_id, {
        user_metadata
      });

      return successRes.data?.user_metadata;


    } catch(e) {
      throw e;
    }

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
    // filter out potential data injection for user and app metadata
    const { app_metadata, user_metadata, ...restUser } = data as User;
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
      isPaid: paid,
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
  // @ApiBearerAuth('bearer')
  // @Post(':id/team')
  // @UseGuards(PermissionGuard([MemberPermissions.WRITE]))
  // @UseGuards(AuthGuard)
  // async markUserTeamStatus(@Param('id') id) {
  //   const app_metadata:Partial<AppMetaData> = {
  //     team
  //   }
  //   return this.userService.updateUser(id, { app_metadata });
  // }

}
