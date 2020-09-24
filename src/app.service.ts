import { Injectable } from '@nestjs/common';
import { initData } from './app.init';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    console.log('App Module Init.');
  }

  onApplicationBootstrap() {
    console.log('完全启动，开始初始化数据');
    initData(this.userService);
  }
}
