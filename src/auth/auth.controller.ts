import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user.register.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entity/user.entity';
import { LoginUserDto } from './dto/user.login.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Post('register')
  register(@Body() userRegisterDto: UserRegisterDto): Promise<User>{
   return this.authService.registerUser(userRegisterDto);
  }
  @Post('login')
  login(@Body() userLoginDto: LoginUserDto): Promise<any>{
    return this.authService.loginUser(userLoginDto);
  }

  
}
