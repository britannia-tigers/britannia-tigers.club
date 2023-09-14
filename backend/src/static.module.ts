import { ServeStaticModule } from "@nestjs/serve-static";


export const StaticModule = (rootPath: string) => ServeStaticModule.forRoot({
  rootPath
});