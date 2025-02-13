import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = Number(process.env.APP_SERVER_PORT);

  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
}
bootstrap();
