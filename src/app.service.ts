import { Injectable } from '@nestjs/common';
import { initData } from './app.init';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    console.log('App Module Init.');
  }

  onApplicationBootstrap() {
    console.log('完全启动，开始初始化数据');
    initData();
  }
}
