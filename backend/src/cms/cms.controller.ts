import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from 'src/auth/permission.guard';
import { SessionPermissions } from './cms.permissions';
import { PageFullResponse, PageListResponse, SessionFullResponse, SessionListResponse } from './cms.interface';
import { SessionDto, SessionRequestDto } from './cms.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  
  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([SessionPermissions.CREATE]))
  @Post('sessions')
  createSession(@Body() { name, location, date }:SessionDto) {
    return this.cmsService.createSession({ name, location, date });
  }

  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([SessionPermissions.WRITE]))
  @Post('sessions/:id/publish')
  publishSession(@Param('id') id:string) {
    return this.cmsService.publishSession(id);
  }

  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([SessionPermissions.READ]))
  @Get('session/:id')
  getSession(@Param('id') id:string) {
    return this.cmsService.getSessionById(id);
  }
  
  /**
   * get all sessions
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([SessionPermissions.LIST]))
  @Get('sessions')
  getSessions(
    @Query() { name, location, skip, limit }:SessionRequestDto
  ):Promise<SessionListResponse> {
    return this.cmsService.findSessions({ name, location, skip, limit });
  }


  /**
   * get next session
   * @returns 
   */
  @ApiBearerAuth('bearer')
  @UseGuards(AuthGuard)
  @UseGuards(PermissionGuard([SessionPermissions.READ]))
  @Get('sessions/next')
  getNextSession():Promise<SessionFullResponse> {
    return this.cmsService.getNextSession();
  }


  /**
   * get pages
   * @returns 
   */
  @Get('pages')
  getPages(@Query('skip') skip, @Query('limit') limit): Promise<PageListResponse> {
    return this.cmsService.getPages({ skip, limit });
  }


  /**
   * get page by id
   * @param id 
   * @returns 
   */
  @Get('pages/:id')
  getPageById(@Param('id') id):Promise<PageFullResponse> {
    return this.cmsService.getPageById(id);
  }
}
