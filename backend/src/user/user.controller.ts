import { Body, Controller, Get, Headers, Logger, NotFoundException, Param, Patch, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UserCreateUpdateRequest, AppMetaData, User } from './user.interface';
import { PermissionGuard } from 'src/auth/permission.guard';
import { MemberPermissions, SelfPermissions } from './user.permissions';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { CloudinaryService } from 'src/media/cloudinary.service';
import { assert } from 'console';


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
    const selfInfo = await this.userService.getSelf(authToken.split(' ')[1]);
    return this.userService.updateUser(selfInfo.sub, data);
  }


  /**
   * get user list with all users, up to 100
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @Get()
  // @UseGuards(PermissionGuard([MemberPermissions.LIST]))
  // @UseGuards(AuthGuard)
  async getUsers():Promise<any> {
    const users = await this.userService.getUserList({ per_page: 100 });
    assert(users.data, 'User data cannot be empty')
    return users.data;
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
   * upload hero image
   * @param authToken 
   * @param file 
   * @returns 
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
  @Post('self/heroimage')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadHeroImage(
    @Headers('authorization') authToken,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const self = await this.userService.getSelf(authToken.split(' ')[1]);
      const cldRes = await this.cloudinaryService.upload(file);
      const imgUrl = this.cloudinaryService.webDownsize(cldRes.public_id, cldRes.format);
      
      return await this.userService.updateUser(self.user_id, {
        user_metadata: {
          ...self.user_metadata,
          heroImages: [...self.user_metadata?.heroImages, imgUrl]
        }
      });
      
    } catch(e) {
      throw e;
    }

  }


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
  @Post('self/upload')
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
  @Post('self/upload-images')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images' },
    { name: 'heroImages' }
  ]))
  @UseGuards(AuthGuard)
  async addImage(
    @Headers('authorization') authToken,
    @UploadedFiles() { images, heroImages }: { 
      images?: Express.Multer.File[],
      heroImages?: Express.Multer.File[]
    }
  ) {
    try {
      const self = await this.userService.getSelf(authToken.split(' ')[1]);

      const img_promises = images.map(async f => {
        const tmp = await this.cloudinaryService.upload(f);
        return this.cloudinaryService.imageResize(tmp.public_id, tmp.format);
      })

      const heroImg_promises = heroImages.map(async f => {
        const tmp = await this.cloudinaryService.upload(f);
        return this.cloudinaryService.imageResize(tmp.public_id, tmp.format);
      })

      const imageUrls = await Promise.all(img_promises);
      const heroImageUrls = await Promise.all(heroImg_promises);

      Logger.log(imageUrls);
      
      return await this.userService.updateUser(self.user_id, {
        user_metadata: {
          ...self.user_metadata,
          images: [...self.user_metadata?.images, ...imageUrls],
          heroImages: [...self.user_metadata?.heroImages, ...heroImageUrls]
        }
      });
      
    } catch(e) {
      Logger.error(e);
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
