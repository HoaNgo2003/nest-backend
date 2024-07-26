import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @UseGuards(AuthGuard)
    @Get()
    getAllUser():Promise<User[]>{
        return this.userService.findAllUser()
    }
    
    @Get(':id')
    getUserById(@Param('id') id: string):Promise<User>{
        console.log(id)
        return this.userService.finUserById(id)
    }
    @Delete('/delete/:id')
    DeleteUserById(@Param('id') id: string): Promise<any>{
        return this.userService.deleteUserById(id)
    }

}
