import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}

  async findAll(): Promise<[Workflow[], number]> {
    return this.workflowRepository.findAndCount({
      skip: 0,
      take: 10,
    });
  }

  async create(workflow: Workflow) {
    return await this.workflowRepository.save(workflow);
  }
}
