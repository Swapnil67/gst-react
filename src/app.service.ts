import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  // Seed the employees
  async seedEmployees(emp_name: string) {
    const emp1 = this.employeeRepo.create({name: emp_name});
    await this.employeeRepo.save(emp1)
    return emp1;
  }

  // Give tasks to employee
  async seedTasksToSpecificEmp(id: number) {
    const task1 = this.taskRepo.create({name: 'Hire New Trainee'})
    await this.taskRepo.save(task1)
    const task2 = this.taskRepo.create({name: 'Give Orientation'})
    await this.taskRepo.save(task2)
    const emp1 = await this.employeeRepo.findOneOrFail(id);
    emp1.tasks = [task1, task2]
    await this.employeeRepo.save(emp1);
    return emp1;
  }


  getEmployeeById(id) {
    const emp = this.employeeRepo
      .createQueryBuilder('emp')
      .leftJoinAndSelect('emp.tasks', "tasks")
      .where("emp.id = :emp_id", {emp_id: id})
      .getOne()
      return emp;
  }
}
