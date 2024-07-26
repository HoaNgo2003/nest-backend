import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user.create.dto';
import * as bcrypt from "bcrypt"
import { LoginUserDto } from './dto/user.login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRespository: Repository<User>,
  private jwtService: JwtService,
  private configService: ConfigService
){}
  async registerUser(registerDto: UserRegisterDto): Promise<User>{
    const {password} = registerDto;
    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass)
    const user = await this.userRespository.findOne({
       where:{
        email: registerDto.email
       }
    })
    if(user){
      throw new HttpException("Email da ton tai", HttpStatus.BAD_REQUEST);
    }
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
     
    const checkPass = await bcrypt.compare(password, user.password)
    if(!checkPass){
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
    }
    const payload = {email: user.email, username: user.username}
    return await this.generateToken(payload);
  }
  async generateToken(payload:{email: string, username: string}){
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload,{
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn:'1d'
    })
    await this.userRespository.update(
      {email: payload.email},
      {refresh_token: refresh_token}
    )
    return {access_token, refresh_token}
  }
  async refreshToken(refreshToken: string): Promise<any>{
    try {
      const verifyData = await this.jwtService.verifyAsync(refreshToken,{
        secret: this.configService.get<string>("JWT_SECRET")
      })
      const checkToKenExit = await this.userRespository.findOneBy({email:verifyData.email, refresh_token: refreshToken})
      if(checkToKenExit){
        return this.generateToken({email: verifyData.email, username: verifyData.username})
      }
      else{
        throw new HttpException('Refresh token invalid', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Refresh token invalid', HttpStatus.BAD_REQUEST);
    }
  }
}
