import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService){}
  @Get()
  getAllResposity():Promise<any>{
    return this.categoryService.getAllCategory()
  }
  @Post()
  createCategory(@Body() category){
    return this.categoryService.create(category)
  }
}
