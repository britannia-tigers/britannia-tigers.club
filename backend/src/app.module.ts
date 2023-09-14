import { Module } from '@nestjs/common';
import { join } from 'path';
import { CmsModule } from './cms/cms.module';
import { ConfigModule } from './config.module';
import { StaticModule } from './static.module';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']
const rootPath = isDev ? join(__dirname, '..', '..', 'dist', 'public') : join(__dirname, '..', 'public')


@Module({
  imports: [
    ConfigModule(envFilePath),
    StaticModule(rootPath),
    CmsModule
  ]
})
export class AppModule {}
