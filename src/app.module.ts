import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { modules, dbConfig } from './app.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [...modules, TypeOrmModule.forRoot(dbConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
