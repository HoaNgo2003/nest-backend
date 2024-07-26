import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Video } from './entity/video.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Video])
  ],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
