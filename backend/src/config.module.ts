import { ConfigModule as NestConfigModule } from "@nestjs/config";

export const ConfigModule = (envFilePath: string[]) => NestConfigModule.forRoot({
  envFilePath
});