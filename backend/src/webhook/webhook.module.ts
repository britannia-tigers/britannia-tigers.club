import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { CmsService } from 'src/cms/cms.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, CmsService]
})
export class WebhookModule {}
