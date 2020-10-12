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
    // 使用bcrypt校验密码
    if (user && bcrypt.compareSync(pass, user.password)) {
      let permissions = await this.userService.getPermissions(user.id);
      permissions = permissions.map(item => {
        return {
          id: item.id,
          keyName: item.keyName,
        };
      });
      return {
        id: user.id,
        permissions,
      };
    }
    return null;
  }

  async login(user: any) {
    // 这里不能存储过多的信息，否则加密后token过大
    const payload = { sub: user.id, permissions: user.permissions };
    // return token和基础信息
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,
    };
  }
}
