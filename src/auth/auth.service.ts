import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  // 验证local
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({
      username,
    });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // 这里不能存储过多的信息，否则加密后token过大
    const payload = { username: user.username, sub: user.id };
    // return token和基础信息
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,
    };
  }
}
