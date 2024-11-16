import { EnvModule } from '@/env/env.module';
import { R2Storage, Uploader } from '@/storage/r2-storage';
import { Module } from '@nestjs/common';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
