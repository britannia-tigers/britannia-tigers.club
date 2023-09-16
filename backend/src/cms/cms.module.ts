import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { ConfigModule } from 'src/config.module';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']

@Module({
  imports: [ConfigModule(envFilePath)],
  controllers: [CmsController],
  providers: [CmsService],
  exports: [CmsService]
})
export class CmsModule {}
