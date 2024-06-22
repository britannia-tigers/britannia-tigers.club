import { Module } from '@nestjs/common';
import { join } from 'path';
import { CmsModule } from './cms/cms.module';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WebhookModule } from './webhook/webhook.module';
import { MessagingModule } from './messaging/messaging.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']
const rootPath = isDev ? join(__dirname, '..', '..', 'output', 'public') : join(__dirname, '../../..', 'output', 'public')


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
    AdminModule,
    CmsModule,
    WebhookModule,
    MessagingModule,
    PaymentModule
  ]
})
export class AppModule {}
