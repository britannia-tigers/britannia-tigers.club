import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AdminController } from "./admin.controller";
import { CloudinaryService } from "src/media/cloudinary.service";

@Module({
  providers: [UserService, CloudinaryService],
  controllers: [AdminController]
})
export class AdminModule {}