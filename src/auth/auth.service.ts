import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SigninUserDto, SignupUserDto } from 'src/user/user.dto';
import { SigninAdminDto } from 'src/admin/admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await user.comparePassword(pass)) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateAdmin(email: string, pass: string): Promise<any> {
    const admin = await this.userService.findByEmail(email);
    if (admin && await admin.comparePassword(pass)) {
      const { Password, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(userBody: SigninUserDto) {
    const user = await this.userService.findByEmail(userBody.Email);
    const payload = { email: user.Email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signup(userBody: SignupUserDto) {
    const user = await this.userService.create(userBody);
    return this.login(user);
  }

  async loginAdmin(adminBody: SigninAdminDto) {
    const admin = await this.userService.findByEmail(adminBody.Email);
    const payload = { email: admin.Email, sub: admin.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  

  
}
