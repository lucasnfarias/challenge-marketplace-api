import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { envSchema } from 'src/env/env';
import { EnvModule } from 'src/env/env.module';
import { MetricsModule } from 'src/metrics/metrics.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    AuthModule,
    MetricsModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
