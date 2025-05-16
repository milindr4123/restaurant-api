import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 Esta línea activa la validación de los DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina propiedades no declaradas en el DTO
    forbidNonWhitelisted: true, // lanza error si llegan propiedades extra
    transform: true, // convierte los tipos automáticamente
  }));

  await app.listen(3000);
}
bootstrap();
