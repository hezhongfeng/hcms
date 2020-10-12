import { Controller, Get, Request, Post, UseGuards, HttpCode, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from '../common/http.response';
import { Permission } from '../user/permission.decorator';
import { PermissionGuard } from '../user/permission.guard';
import { ProductService } from './product.service';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // JWT 守卫验证和基于业务的权限守卫
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('admin')
  @Get('')
  async getCurrent(@Request() req, @Query() query): Promise<Response> {
    console.log('query', query);
    const { user } = req;
    const [producs] = await this.productService.findAll();
    return {
      code: '200',
      data: producs,
      message: '',
    };
  }
}
