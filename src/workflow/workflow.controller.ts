import { Controller, Get, Request, Post, UseGuards, HttpCode, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from '../common/http.response';
import { Permission } from '../user/permission.decorator';
import { PermissionGuard } from '../user/permission.guard';
import { WorkflowService } from './workflow.service';

@Controller('api/v1/workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  // JWT 守卫验证和基于业务的权限守卫
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission('admin')
  @Get('')
  async getCurrent(@Request() req, @Query() query): Promise<Response> {
    console.log('query', query);
    const { user } = req;
    const [workflows] = await this.workflowService.findAll();
    return {
      code: '200',
      data: workflows,
      message: '',
    };
  }
}
