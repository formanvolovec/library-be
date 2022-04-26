import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CryptoService } from './crypto/crypto.service';

const MODULES = [DatabaseModule];

@Global()
@Module({
  imports: MODULES,
  providers: [CryptoService],
  exports: [...MODULES, CryptoService],
})
export class SharedModule {}
