import { Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryReposity: Repository<Category>){}
  async getAllCategory():Promise<any>{
    return await this.categoryReposity.find()
  }
  async create(category){
    return await this.categoryReposity.save(category)
  }
}
