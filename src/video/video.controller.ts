import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateVideoDto } from './dto/video.create.dto';
import { Video } from './entity/video.entity';
import { VideoService } from './video.service';
 
 
import { UpdateVideoDto } from './dto/update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Video")
@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService){}
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('create')
  createVideo(@Body() ceateVideoDto: CreateVideoDto, @Req() request): Promise<Video>{
    return this.videoService.create(request['user'].email,ceateVideoDto);
  }
  @Get()
  findAll():Promise<any>{
    return this.videoService.findAllVideo();
  }
  @Get(':id')
  getVideoById(@Param("id") id: string):Promise<Video>{
    return this.videoService.findVideoById(id)
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  updateVideo(@Param("id") id: string, @Body() updateVideo: UpdateVideoDto): Promise<any>{
    return this.videoService.updateVideo(id, updateVideo);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete("/delete/:id")
  deleteVideo(@Param("id") id: string):Promise<any>{
    return this.videoService.deleteVideo(id);
  }
}
