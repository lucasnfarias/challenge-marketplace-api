import { EnvService } from '@/env/env.service';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);

  app.use(cookieParser());

  app.enableCors();

  await app.listen(env.get('PORT'));
}
bootstrap();
