import { Controller,   Get,   ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './storage.config';
 
@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file',{
   storage
  }))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators:[
        // new FileTypeValidator({fileType: "image/jpeg"})
      ]
    })
  ) file: Express.Multer.File
  
){
    console.log(file)
  }
  @Get()
  getFile(){
    return "../.."
  }
}
