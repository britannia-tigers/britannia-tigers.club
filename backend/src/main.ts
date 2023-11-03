import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;
const API_TITLE = process.env.API_TITLE || 'Britannia Tigers Local';
const API_VERSION = process.env.API_VERSION || '0.1-alpha';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });

  const docConfig = new DocumentBuilder()
    .setTitle(API_TITLE)
    .setDescription(`${API_TITLE} Documentation`)
    .setVersion(API_VERSION)
    .addBearerAuth({ 
      type: 'http',
      name: 'Authorization'
    })
    .build();

    const doc = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup('api', app, doc);

  await app.listen(PORT);
}

bootstrap();
