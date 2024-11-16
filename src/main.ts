import { EnvService } from '@/env/env.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);

  app.enableCors();

  await app.listen(env.get('PORT'));
}
bootstrap();
