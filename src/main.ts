import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(
    new ValidationPipe()
  )
  const config = new DocumentBuilder()
  .setTitle('Youtube example')
  .setDescription('The Youtube API description')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
