import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './features/book/book.module';
import * as mongoose from 'mongoose'
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/27017/'),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor() {
    this.initMongoose();
  }
  private initMongoose() {
    mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true });
    mongoose.connection.on('error', () => process.exit(-1));
  }
}
