import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SharedModule } from '../shared/shared.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';

const MODULES = [UserModule, BookModule, AuthModule, FileModule];

@Module({
  imports: [...MODULES, SharedModule],
  exports: MODULES,
})
export class FeatureModule {}
