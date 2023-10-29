import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from 'src/auth/permission.guard';
import { SessionPermissions } from './cms.permissions';
import { PageFullResponse, PageListResponse, SessionFullResponse, SessionListResponse, SponsorListResponse } from './cms.interface';
import { AddParticipantsDto, SessionDto, SessionRequestDto } from './cms.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/messaging/mail.service';
import mailConfig from 'src/messaging/mail.config';
import { SmsService } from 'src/messaging/sms.service';
import smsConfig from 'src/messaging/sms.config';
import contentfulConfig from './contentful.config';
import { getNextDayOfWeek } from 'src/utils/dateTime.utils';
import { AssetProps, CollectionProp } from 'contentful-management';
import { UserService } from 'src/user/user.service';


@Controller('api')
export class CmsController {
  constructor(
    private readonly cmsService: CmsService,
    private readonly mailService: MailService,
    private readonly smsService: SmsService,
    private readonly userService: UserService
  ) {}

  
  /**
   * Create session
   * @param param0 
   * @returns 
   */
  @ApiTags('Sessions')
  // @ApiBearerAuth('bearer')
  @ApiQuery({ name: 'thursday' })
  // @UseGuards(AuthGuard)
  // @UseGuards(PermissionGuard([SessionPermissions.CREATE]))
  @Post('sessions')
  createSession(
    @Query('thursday') isThursday:boolean,
    @Body() { name, location, date }:SessionDto
  ) {
    
    if(isThursday) {

      const upcomingThursday = getNextDayOfWeek(contentfulConfig.thursday.dayOfWeek, contentfulConfig.thursday.startHour);

      return this.cmsService.createSession({
        name: contentfulConfig.thursday.name,
        location: contentfulConfig.thursday.location.join(','),
        date: upcomingThursday.toISOString()
      })
    } else {
      return this.cmsService.createSession({ name, location, date });
    }
  }


  /**
   * Add list of participants to session
   * @param id 
   * @param param1 
   * @returns 
   */
  @ApiTags('Sessions')
  @ApiBearerAuth('bearer')
  @Post('sessions/:id/participants')
  addSessionParticipants(
    @Param('id') id: string,
    @Body() {userIds}: AddParticipantsDto
  ) {
    return this.cmsService.addParticipants(id, userIds);
  }


  /**
   * Add self to list of participants
   * @param id 
   * @param param1 
   * @returns 
   */
  @ApiTags('Sessions')
  @ApiBearerAuth('bearer')
  @Post('sessions/:id/participants/self')
  @UseGuards(AuthGuard)
  async addSelfToSession(
    @Headers('authorization') authToken,
    @Param('id') id: string,
  ) {
    const user = await this.userService.getSelf(authToken.split(' ')[1]);
    return this.cmsService.addParticipants(id, [user.user_id]);
  }


  /**
   * Delete self from list of participants
   * @param authToken 
   * @param id 
   * @returns 
   */
  @ApiTags('Sessions')
  @ApiBearerAuth('bearer')
  @Delete('sessions/:id/participants/self')
  @UseGuards(AuthGuard)
  async removeSelfToSession(
    @Headers('authorization') authToken,
    @Param('id') id: string,
  ) {
    const user = await this.userService.getSelf(authToken.split(' ')[1]);
    return this.cmsService.removeParticipants(id, [user.user_id]);
  }


  /**
   * publish a session
   * @param id 
   * @returns 
   */
  @ApiTags('Sessions')
  @ApiBearerAuth('bearer')
  // @UseGuards(AuthGuard)
  // @UseGuards(PermissionGuard([SessionPermissions.WRITE]))
  @Post('sessions/:id/publish')
  publishSession(@Param('id') id:string) {
    return this.cmsService.publishSession(id);
  }


  /**
   * update a session with option to publish right away
   * @param id 
   * @param body 
   * @param publish 
   * @returns 
   */
  @ApiTags('Sessions')
  @ApiBearerAuth('bearer')
  @ApiQuery({ name: 'publish', required: false })
  // @UseGuards(AuthGuard)
  // @UseGuards(PermissionGuard([SessionPermissions.WRITE]))
  @Put('sessions/:id')
  async updateSession(
    @Param('id') id:string,
    @Body() body: SessionDto,
    @Query('publish') publish:boolean
  ) {
    
    const res = await this.cmsService.updateSession(id, body);
    if(publish) await this.cmsService.publishSession(id);
    return res;
  }


  /**
   * get a session
   * @param id
   * @returns 
   */
  @ApiTags('Sessions')
  @ApiBearerAuth('bearer')
  // @UseGuards(PermissionGuard([SessionPermissions.READ]))
  @Get('sessions/:id')
  getSession(@Param('id') id:string) {
    return this.cmsService.getSessionById(id);
  }

  
  /**
   * get all sessions
   * @returns 
   */
  @ApiTags('Sessions')
  @ApiBearerAuth('bearer')
  // @UseGuards(AuthGuard)
  // @UseGuards(PermissionGuard([SessionPermissions.LIST]))
  @Get('sessions')
  getSessions(
    @Query() { 
      name, location, skip, limit,
      date, startDate, endDate
    }:SessionRequestDto


  ):Promise<SessionListResponse> {
    return this.cmsService.findSessions({ 
      name, location, skip, limit,
      date, startDate, endDate
    });
  }


  /**
   * get next session
   * @returns 
   */
  @ApiTags('Sessions')
  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([SessionPermissions.READ]))
  @Get('sessions/next')
  getNextSession():Promise<SessionFullResponse> {
    return this.cmsService.getNextSession();
  }

  @ApiTags('Sponsors')
  @Get('sponsors')
  getSponsors(@Query('skip') skip, @Query('limit') limit): Promise<SponsorListResponse> {
    return this.cmsService.getSponsors({ skip, limit });
  }

  @ApiTags('Assets')
  @Get('assets')
  getAssets(): Promise<CollectionProp<AssetProps>> {
    return this,this.cmsService.getAllAssets();
  }


  /**
   * get pages
   * @returns 
   */
  @ApiTags('Pages')
  @Get('pages')
  getPages(@Query('skip') skip, @Query('limit') limit): Promise<PageListResponse> {
    return this.cmsService.getPages({ skip, limit });
  }


  /**
   * get page by id
   * @param id 
   * @returns 
   */
  @ApiTags('Pages')
  @Get('pages/:id')
  async getPageById(@Param('id') id):Promise<PageFullResponse> {

    await this.smsService.sendMessage({
      from: smsConfig.sender,
      to: '+447867686312',
      body: 'I love you, Please meet me at my hotel. You love, Taeyang'
    })

    const res = await this.cmsService.getPageById(id);
    return res;
  }
}
