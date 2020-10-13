import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { BaseType } from './basetype/basetype.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(BaseType)
    private readonly baseRepository: Repository<BaseType>,
  ) {}

  async findAll(): Promise<[Product[], number]> {
    return this.productRepository.findAndCount({
      skip: 0,
      take: 10,
    });
  }

  // find(id: string): Promise<User> {
  //   return this.userRepository.findOne(id);
  // }

  // findOne(option: any): Promise<User> {
  //   return this.userRepository.findOne(option);
  // }

  async create(product: Product) {
    return await this.productRepository.save(product);
  }

  async createBaseType(baseType: BaseType) {
    return await this.baseRepository.save(baseType);
  }
}
