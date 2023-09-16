import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from 'src/auth/permission.guard';
import { SessionPermissions } from './cms.permissions';
import { PageListResponse, SessionFullResponse, SessionListResponse } from './cms.interface';

@Controller('api')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  
  /**
   * get all sessions
   * @returns 
   */
  @UseGuards(PermissionGuard([SessionPermissions.LIST]))
  @UseGuards(AuthGuard)
  @Get('sessions')
  getSessions(
    @Query('name') name,
    @Query('location') location,
    @Query('skip') skip, 
    @Query('limit') limit
  ):Promise<SessionListResponse> {
    return this.cmsService.findSessions({ name, location, skip, limit });
  }


  /**
   * get next session
   * @returns 
   */
  @UseGuards(PermissionGuard([SessionPermissions.READ]))
  @UseGuards(AuthGuard)
  @Get('sessions/next')
  getNextSession():Promise<SessionFullResponse> {
    return this.cmsService.getNextSession();
  }


  /**
   * get session by id
   * @param id 
   * @returns 
   */
  @UseGuards(PermissionGuard([SessionPermissions.READ]))
  @UseGuards(AuthGuard)
  @Get('sessions/:id')
  getSessionById(@Param('id') id):Promise<SessionFullResponse> {
    return this.cmsService.getSessionById(id);
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
  @UseGuards(PermissionGuard([SessionPermissions.READ]))
  @UseGuards(AuthGuard)
  @Get('pages/:id')
  getPageById(@Param('id') id):Promise<SessionFullResponse> {
    return this.cmsService.getPageById(id);
  }
}
