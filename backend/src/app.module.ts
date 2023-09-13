import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']
const rootPath = isDev ? join(__dirname, '..', '..', 'dist', 'public') : join(__dirname, '..', 'public')

console.info('current NODE_ENV: ', process.env)

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath
    }),
    ServeStaticModule.forRoot({
      rootPath
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
