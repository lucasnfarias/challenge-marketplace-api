import { NestFactory } from '@nestjs/core';
import { EnvService } from 'src/env/env.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);

  await app.listen(env.get('PORT'));
}
bootstrap();
