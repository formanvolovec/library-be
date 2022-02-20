import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { PostModule } from './features/post/post.module';
import configuration from './shared/config';
import { BookModule } from './features/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    SharedModule,
    UserModule,
    PostModule,
    BookModule,
  ],
})
export class AppModule {}
