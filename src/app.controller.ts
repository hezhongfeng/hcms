import { Controller, Get, Request, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Response } from './common/http.response';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req): Promise<Response> {
    const result = await this.authService.login(req.user);
    return {
      code: '200',
      data: result,
      message: '',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrent(@Request() req): Response {
    return {
      code: '200',
      data: req.user,
      message: '',
    };
  }
}
