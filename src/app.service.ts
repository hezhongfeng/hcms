import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    console.log('App Module Init.');
  }

  OnApplicationBootstrap() {
    console.log('完全启动后');
  }
}
