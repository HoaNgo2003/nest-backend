import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UploadModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type:"mongodb",
      url: process.env.MONGO_URL,
      synchronize: true,
      logging: true,
      entities: [User]
    }),
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
