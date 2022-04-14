import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CryptoService } from './crypto/crypto.service';
import { FileService } from './file/file.service';

const MODULES = [DatabaseModule];

@Global()
@Module({
  imports: MODULES,
  providers: [CryptoService, FileService],
  exports: [...MODULES, CryptoService, FileService],
})
export class SharedModule {}
