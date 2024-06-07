// auth.controller.ts
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SigninUserDto, SignupUserDto } from 'src/user/user.dto';
import { SigninAdminDto, SignupAdminDto } from 'src/admin/admin.dto';
import { User } from 'src/user/user.entity';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 
  @Post('signin')
  async signin(@Body() userBody:SigninUserDto) {
    console.log("TEST",userBody);
    return this.authService.login(userBody);
  }

  @Post('signup')
  async signup(@Body() userBody:SignupUserDto) {
    const user = await this.authService.signup(userBody);
    return user;
  }

   
  @Post('signinAdmin')
  async signinAdmin(@Body() adminBody:SigninAdminDto) {
    console.log("TEST",adminBody);
    return this.authService.login(adminBody);
  }

  
}

