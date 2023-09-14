import { Controller, Get } from '@nestjs/common';
import { CmsService, MembersResponse } from './cms.service';

@Controller()
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('api/members')
  getMembers(): Promise<MembersResponse> {
    return this.cmsService.getMembers();
  }
}
