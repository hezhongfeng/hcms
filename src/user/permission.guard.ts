import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // JWT守卫下的权限守卫
  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get<string[]>('permission', context.getHandler());
    // controller上添加的自定义权限
    console.log('permission', permission);
    // if (!roles) {
    //   return true;
    // }
    const { user } = context.switchToHttp().getRequest();
    console.log('request', user);
    return true;
  }
}
