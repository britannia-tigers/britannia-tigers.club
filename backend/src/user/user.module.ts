import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CloudinaryService } from 'src/media/cloudinary.service';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']

@Module({
  providers: [UserService, CloudinaryService],
  controllers: [UserController]
})
export class UserModule {}
