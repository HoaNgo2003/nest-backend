import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService,
        private configService: ConfigService
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extracTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get<string>("JWT_SECRET")
                }
            )
            
            request['user'] = payload;
        } catch (error) {
            console.log(error)
            throw new HttpException({
                status: 419,
                message:"Token invalid"
            }, 419)
        }
        return true
    }
    private extracTokenFromHeader(request: Request):string|undefined{
        console.log(request.body)
        const [type, token] = request.headers.authorization?.split(' ')??[];
        return type === 'Bearer' ? token : undefined;
    }

}