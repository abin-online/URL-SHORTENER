// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlsModule } from './urls/urls.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://abinbabuonline:9keKKq4zY9787Psv@cluster0.2pfbh.mongodb.net/urlShortener'),
    UrlsModule,
    AuthModule,
  ],
})
export class AppModule {}
