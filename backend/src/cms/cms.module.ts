import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']

@Module({
  controllers: [CmsController],
  providers: [CmsService]
  // exports: [CmsService]
})
export class CmsModule {}
