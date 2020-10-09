import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule, PermissionModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, RoleModule, PermissionModule],
})
export class UserModule {}
