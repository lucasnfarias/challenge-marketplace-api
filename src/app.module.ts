import { AuthModule } from '@/auth/auth.module';
import { envSchema } from '@/env/env';
import { EnvModule } from '@/env/env.module';
import { MetricsModule } from '@/metrics/metrics.module';
import { ProductsModule } from '@/products/products.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
