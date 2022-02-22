import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

const MODULES = [DatabaseModule];

@Module({
  imports: MODULES,
  exports: MODULES,
})
export class SharedModule {}
