import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user.create.dto';
import * as bcrypt from "bcrypt"
import { LoginUserDto } from './dto/user.login.dto';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRespository: Repository<User>){}
  async registerUser(registerDto: UserRegisterDto): Promise<User>{
    const {password} = registerDto;
    const hashPass = await bcrypt.hash(password, 10);
    return await this.userRespository.save({...registerDto, password: hashPass, refresh_token: "refresh_token"
    });
  }
  async loginUser(loginUser: LoginUserDto): Promise<any>{
    const {email, password} = loginUser;
    const user = await this.userRespository.findOne({
      where:{email}
    })
    if(!user){
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }
    const checkPass = bcrypt.compareSync(password, user.password);
    if(!checkPass){
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
    }
  }
}
