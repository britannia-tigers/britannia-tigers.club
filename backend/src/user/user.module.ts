import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from 'src/config.module';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']

@Module({
  imports: [ConfigModule(envFilePath)],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
