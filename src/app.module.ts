import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import configuration from './shared/config';
import { FeatureModule } from './features/feature.module';
import { FileModule } from './shared/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    SharedModule,
    FeatureModule,
  ],
})
export class AppModule {}
