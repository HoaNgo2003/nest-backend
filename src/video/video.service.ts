import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/video.create.dto';
import { Video } from './entity/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import {    Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UpdateVideoDto } from './dto/update.dto';
@Injectable()
export class VideoService {
  constructor(@InjectRepository(User) private userResposity: Repository<User>,
  @InjectRepository(Video) private videoRespository: Repository<Video>){}
  async create(email: string, createVideoDto:CreateVideoDto ): Promise<Video>{
    const user = await this.userResposity.findOneBy({email})
    try {
      const res = await this.videoRespository.save({...createVideoDto, userId: user.id})
      return res;
    } catch (error) {
      throw new HttpException("Can not create video", HttpStatus.BAD_REQUEST)
    }
  }
  async findAllVideo():Promise<any>{ 
    // const search = querydto.search;
    // const videos = await this.videoRespository.find({
    //    where:{
    //    title: search
    //    },
    //     relations:['user'],
    //     select:{
    //       user:{
    //         email: true,
    //         username: true
    //       }
    //     },
    //     order:{create_at: "desc"}
    // })

    const videos = await this.videoRespository.find();
     return {videos}
  }
  async findVideoById(id: string): Promise<any>{
    const videoID = new ObjectId(id)
    try {
      const video = await this.videoRespository.findOneById(videoID);
      return video 
    } catch (error) {
      throw new HttpException("Not found video", HttpStatus.NOT_FOUND)
    }
  }
  async updateVideo(id: string, updateVideoDto: UpdateVideoDto):Promise<any>{
    const videoId = new ObjectId(id)
    try {
      const video = await this.findVideoById(id)
      console.log(video)
      if(!video){
        throw new HttpException("video not found", HttpStatus.NOT_FOUND)
      }
       await this.videoRespository.update(videoId, updateVideoDto);
      return {message: "update video success"};
    } catch (error) {
      throw new HttpException("can not update video", HttpStatus.BAD_REQUEST)
    }
  }
  async deleteVideo(id: string):Promise<any>{
    try {
    
      await this.videoRespository.delete(new ObjectId(id))
      return {message: "delete video success"}
    } catch (error) {
      throw new HttpException("Can not delete video", HttpStatus.BAD_REQUEST)
    }
  }
}
