import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
