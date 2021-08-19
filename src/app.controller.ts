import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/createEmp')
  async createEmployee(): Promise<any> {
    const newEmp = await this.appService.seedEmployees("vegeta");
    return newEmp;
  }

  @Get('/task/:id')
  async postEmployeeTask(@Param() id: any) {
    const data = await this.appService.seedTasksToSpecificEmp(id.id);
    return data;
  }
  @Get('/employee/:id')
  async getEmployeeById(@Param() id: any) {
    const emp = await this.appService.getEmployeeById(id.id);
    return emp;
  }
}
