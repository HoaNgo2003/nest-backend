import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user.create.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Post('register')
  register(@Body() userRegisterDto: UserRegisterDto): Promise<User>{
   return this.authService.registerUser(userRegisterDto);
  }
}
