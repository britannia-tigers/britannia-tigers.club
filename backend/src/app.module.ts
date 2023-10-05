import { Module } from '@nestjs/common';
import { join } from 'path';
import { CmsModule } from './cms/cms.module';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookService } from './webhook/webhook.service';
import { WebhookModule } from './webhook/webhook.module';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']
const rootPath = isDev ? join(__dirname, '..', '..', 'output', 'public') : join(__dirname, 'output', 'public')


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath
    }),
    ServeStaticModule.forRoot({
      rootPath
    }),
    UserModule,
    CmsModule,
    WebhookModule,
  ],
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class AppModule {}
